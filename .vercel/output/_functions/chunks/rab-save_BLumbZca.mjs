import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as supabaseFetch } from "./supabase_CMHH-ulj.mjs";
//#region src/pages/api/rab-save.ts
var rab_save_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	try {
		const { jenisPekerjaan = "Kustom", luasBangunan = 0, lokasi = "", paketSlug = "", items = [], profitRate = 10, taxRate = 11, subtotal = 0, totalCost = 0 } = await request.json();
		const payload = {
			jenis_pekerjaan: jenisPekerjaan,
			luas_bangunan: luasBangunan,
			lokasi,
			paket_slug: paketSlug,
			items,
			profit_rate: profitRate,
			tax_rate: taxRate,
			subtotal,
			total_cost: totalCost
		};
		let result = null;
		try {
			result = await supabaseFetch("rab_calculations", {
				method: "POST",
				body: JSON.stringify(payload)
			});
		} catch (dbErr) {
			console.error("[Supabase Error] Gagal menyimpan kalkulasi:", dbErr.message);
		}
		if (result && Array.isArray(result) && result.length > 0) return new Response(JSON.stringify({
			id: result[0].id,
			success: true
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
		else {
			const mockId = crypto.randomUUID();
			console.warn("[Supabase Fallback] Menggunakan mock ID karena kegagalan database:", mockId);
			return new Response(JSON.stringify({
				id: mockId,
				success: true,
				warning: "Supabase credentials missing or database insert failed."
			}), {
				status: 200,
				headers: { "Content-Type": "application/json" }
			});
		}
	} catch (err) {
		console.error("API Error /api/rab-save:", err);
		return new Response(JSON.stringify({ error: err.message || "Server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/rab-save@_@ts
var page = () => rab_save_exports;
//#endregion
export { page };
