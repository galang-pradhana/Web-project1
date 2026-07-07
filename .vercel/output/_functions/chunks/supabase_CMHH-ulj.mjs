//#region src/utils/supabase.ts
var getEnv = (key) => {
	if (typeof process !== "undefined" && process.env) return process.env[key];
	if (typeof import.meta !== "undefined" && Object.assign({
		"ASSETS_PREFIX": void 0,
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"PUBLIC_WHATSAPP_NUMBER": "628123456789",
		"SITE": void 0,
		"SSR": true
	}, {
		SUPABASE_ANON_KEY: "",
		SUPABASE_URL: "",
		_: "/home/galangpradhana/.nvm/versions/node/v24.15.0/bin/npm"
	})) return Object.assign({
		"ASSETS_PREFIX": void 0,
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"PUBLIC_WHATSAPP_NUMBER": "628123456789",
		"SITE": void 0,
		"SSR": true
	}, {
		SUPABASE_ANON_KEY: "",
		SUPABASE_URL: "",
		_: "/home/galangpradhana/.nvm/versions/node/v24.15.0/bin/npm"
	})[key];
};
var SUPABASE_URL = getEnv("SUPABASE_URL");
var SUPABASE_ANON_KEY = getEnv("SUPABASE_ANON_KEY");
async function supabaseFetch(path, options = {}) {
	if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
		console.warn("[Supabase] Warning: SUPABASE_URL atau SUPABASE_ANON_KEY belum dikonfigurasi di .env.");
		return null;
	}
	const url = `${SUPABASE_URL.endsWith("/") ? SUPABASE_URL.slice(0, -1) : SUPABASE_URL}/rest/v1/${path}`;
	const response = await fetch(url, {
		...options,
		headers: {
			"apikey": SUPABASE_ANON_KEY,
			"Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
			"Content-Type": "application/json",
			"Prefer": "return=representation",
			...options.headers || {}
		}
	});
	if (!response.ok) {
		const errText = await response.text();
		throw new Error(`Supabase API error: ${errText}`);
	}
	return response.json();
}
//#endregion
export { supabaseFetch as t };
