import type { APIRoute } from 'astro';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const accountId = import.meta.env.R2_ACCOUNT_ID || process.env.R2_ACCOUNT_ID;
    const accessKeyId = import.meta.env.R2_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = import.meta.env.R2_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCESS_KEY;
    const bucketName = import.meta.env.R2_BUCKET_NAME || process.env.R2_BUCKET_NAME;
    const endpoint = import.meta.env.R2_ENDPOINT || process.env.R2_ENDPOINT || (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : '');
    const publicUrl = (import.meta.env.R2_PUBLIC_URL || process.env.R2_PUBLIC_URL || '').replace(/\/$/, '');

    if (!accessKeyId || !secretAccessKey || !bucketName) {
      return new Response(
        JSON.stringify({ 
          error: 'Kredensial R2 di file .env belum lengkap.', 
          debug: { hasAccountId: !!accountId, hasAccessKey: !!accessKeyId, hasSecretKey: !!secretAccessKey, hasBucket: !!bucketName } 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const s3Client = new S3Client({
      region: 'auto',
      endpoint: endpoint,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });

    const contentTypeHeader = request.headers.get('content-type') || '';

    // If client sends JSON requesting a Presigned Upload URL (Direct Browser to R2 Upload)
    if (contentTypeHeader.includes('application/json')) {
      const body = await request.json();
      const { name, type } = body;
      if (!name) {
        return new Response(
          JSON.stringify({ error: 'Nama berkas tidak ditemukan.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const fileExt = name.split('.').pop()?.toLowerCase() || 'bin';
      const sanitizedBase = name
        .substring(0, name.lastIndexOf('.'))
        .replace(/[^a-zA-Z0-9_-]/g, '_');
      
      const fileName = `${sanitizedBase}_${Date.now()}.${fileExt}`;
      const mimeType = type || 'application/octet-stream';

      const putCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        ContentType: mimeType,
      });

      const uploadUrl = await getSignedUrl(s3Client, putCommand, { expiresIn: 900 });
      const filePublicUrl = publicUrl ? `${publicUrl}/${fileName}` : `${endpoint}/${bucketName}/${fileName}`;

      return new Response(
        JSON.stringify({
          success: true,
          presigned: true,
          uploadUrl: uploadUrl,
          url: filePublicUrl,
          fileName: fileName,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Otherwise handle direct multipart FormData fallback
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file || typeof file === 'string') {
      return new Response(
        JSON.stringify({ error: 'Tidak ada berkas yang diunggah.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'bin';
    const sanitizedBase = file.name
      .substring(0, file.name.lastIndexOf('.'))
      .replace(/[^a-zA-Z0-9_-]/g, '_');
    
    const fileName = `${sanitizedBase}_${Date.now()}.${fileExt}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: file.type || 'application/octet-stream',
      })
    );

    const filePublicUrl = publicUrl ? `${publicUrl}/${fileName}` : `${endpoint}/${bucketName}/${fileName}`;

    return new Response(
      JSON.stringify({
        success: true,
        fileName: fileName,
        url: filePublicUrl,
        size: file.size,
        type: file.type,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('R2 Upload API Error:', err);
    return new Response(
      JSON.stringify({ error: 'Gagal mengunggah berkas ke R2', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
