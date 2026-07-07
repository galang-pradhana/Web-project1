import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as keystatic_config_default } from "./keystatic.config_BqjxRUY3.mjs";
import { t as calculateDetailedRAB } from "./rab-formula_CNIPtC-K.mjs";
import { createReader } from "@keystatic/core/reader";
//#region src/pages/api/rab-calculate.ts
var rab_calculate_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	try {
		const { items, taxRatePercent = 0, profitRatePercent = 0 } = await request.json();
		if (!items || !Array.isArray(items)) return new Response(JSON.stringify({ error: "Missing or invalid items array." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const reader = createReader(process.cwd(), keystatic_config_default);
		const rawMaterials = await reader.collections.hargaBahan.all();
		const rawWages = await reader.collections.hargaUpah.all();
		const rawAHSP = await reader.collections.ahspItem.all();
		const materialsRecord = {};
		rawMaterials.forEach((m) => {
			materialsRecord[m.slug] = {
				slug: m.slug,
				...m.entry
			};
		});
		const wagesRecord = {};
		rawWages.forEach((w) => {
			wagesRecord[w.slug] = {
				slug: w.slug,
				...w.entry
			};
		});
		const ahspRecord = {};
		rawAHSP.forEach((a) => {
			ahspRecord[a.slug] = {
				slug: a.slug,
				...a.entry
			};
		});
		const results = calculateDetailedRAB(items, ahspRecord, materialsRecord, wagesRecord, taxRatePercent, profitRatePercent);
		return new Response(JSON.stringify(results), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
			}
		});
	} catch (err) {
		console.error("RAB Calculation API Error:", err);
		return new Response(JSON.stringify({ error: err.message || "Server error occurred during calculation." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/rab-calculate@_@ts
var page = () => rab_calculate_exports;
//#endregion
export { page };
