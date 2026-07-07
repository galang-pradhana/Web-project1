import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as supabaseFetch } from "./supabase_CMHH-ulj.mjs";
//#region src/pages/api/rab-lead.ts
var rab_lead_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	try {
		const { nama = "", whatsapp = "", email = "", calculationId = null, sumberMode = "quick" } = await request.json();
		if (!nama || !whatsapp) return new Response(JSON.stringify({ error: "Nama dan nomor WhatsApp wajib diisi." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const payload = {
			nama,
			whatsapp,
			email: email || null,
			calculation_id: calculationId || null,
			sumber_mode: sumberMode
		};
		let result = null;
		try {
			result = await supabaseFetch("rab_leads", {
				method: "POST",
				body: JSON.stringify(payload)
			});
		} catch (dbErr) {
			console.error("[Supabase Error] Gagal menyimpan lead:", dbErr.message);
		}
		const isSuccess = !!(result && Array.isArray(result) && result.length > 0);
		return new Response(JSON.stringify({
			success: true,
			databaseSaved: isSuccess,
			warning: isSuccess ? void 0 : "Supabase database insert skipped or failed"
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("API Error /api/rab-lead:", err);
		return new Response(JSON.stringify({ error: err.message || "Server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/rab-lead@_@ts
var page = () => rab_lead_exports;
//#endregion
export { page };
