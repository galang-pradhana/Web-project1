/**
 * Cloudflare Worker for R2 Upload API
 * Handle image & video uploads directly to Cloudflare R2 Bucket
 */

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Secret",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    try {
      // Optional Secret Protection
      const authHeader = request.headers.get("X-Admin-Secret");
      if (env.UPLOAD_SECRET && authHeader !== env.UPLOAD_SECRET) {
        return new Response(JSON.stringify({ error: "Unauthorized access" }), {
          status: 401,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      }

      const formData = await request.formData();
      const file = formData.get("file");

      if (!file || typeof file === "string") {
        return new Response(JSON.stringify({ error: "Tidak ada file yang diunggah" }), {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      }

      // Format filename with timestamp to prevent name collision
      const fileExt = file.name.split(".").pop().toLowerCase();
      const sanitizedBase = file.name
        .substring(0, file.name.lastIndexOf("."))
        .replace(/[^a-zA-Z0-9_-]/g, "_");
      
      const fileName = `${sanitizedBase}_${Date.now()}.${fileExt}`;

      // Upload to R2 Bucket
      await env.MY_R2_BUCKET.put(fileName, file.stream(), {
        httpMetadata: {
          contentType: file.type || "application/octet-stream",
        },
      });

      // Construct public URL
      const publicBaseUrl = (env.PUBLIC_R2_DOMAIN || "").replace(/\/$/, "");
      const publicUrl = publicBaseUrl 
        ? `${publicBaseUrl}/${fileName}`
        : `https://${env.R2_SUBDOMAIN || "media"}.r2.dev/${fileName}`;

      return new Response(
        JSON.stringify({
          success: true,
          fileName: fileName,
          url: publicUrl,
          size: file.size,
          type: file.type,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Gagal mengunggah file ke R2", details: err.message }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  },
};
