import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { D as addAttribute, E as renderHead, M as createComponent, S as renderTemplate, j as createAstro } from "./render_BLk4hTKR.mjs";
import { t as generateToken } from "./auth_CPrzKIvb.mjs";
import "./compiler_zGY2KDy3.mjs";
/* empty css                 */
//#region src/pages/login-cms.astro
var login_cms_exports = /* @__PURE__ */ __exportAll({
	default: () => $$LoginCms,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$LoginCms = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LoginCms;
	let errorMessage = "";
	const redirectUrl = Astro.url.searchParams.get("redirect") || "/keystatic";
	if (Astro.request.method === "POST") try {
		const data = await Astro.request.formData();
		const username = data.get("username")?.toString();
		const password = data.get("password")?.toString();
		const envUsername = process.env.ADMIN_USERNAME || "admin";
		const envPassword = process.env.ADMIN_PASSWORD || "creativa2026";
		if (username === envUsername && password === envPassword) {
			const timestamp = Date.now();
			const cookieValue = `${username}:${timestamp}:${generateToken(username, timestamp)}`;
			Astro.cookies.set("keystatic-auth", cookieValue, {
				path: "/",
				httpOnly: true,
				secure: true,
				sameSite: "lax",
				maxAge: 3600 * 24
			});
			return Astro.redirect(redirectUrl);
		} else errorMessage = "Nama pengguna atau kata sandi tidak valid.";
	} catch (e) {
		errorMessage = "Terjadi kesalahan sistem. Silakan coba lagi.";
	}
	return renderTemplate`<html lang="id"><head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"${addAttribute(Astro.generator, "content")}><meta name="robots" content="noindex, nofollow"><title>CMS Portal Login — Creativa Studio</title>${renderHead($$result)}</head><body class="bg-[var(--bg-secondary)] min-h-screen flex items-center justify-center p-4 selection:bg-black selection:text-white relative overflow-hidden"><!-- Decorative Grid Background --><div class="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-20"><div class="border-r border-b border-[var(--border-color)]"></div><div class="border-r border-b border-[var(--border-color)]"></div><div class="border-r border-b border-[var(--border-color)]"></div><div class="border-r border-b border-[var(--border-color)]"></div><div class="border-r border-b border-[var(--border-color)]"></div><div class="border-b border-[var(--border-color)]"></div>${Array.from({ length: 30 }).map(() => renderTemplate`<div class="border-r border-b border-[var(--border-color)]"></div>`)}</div><!-- Login Container --><div class="w-full max-w-md bg-[var(--bg-primary)] border border-[var(--border-color)] p-8 relative z-10 shadow-sm rounded-none"><!-- Crop Marks (Brutalist Architectural Theme) --><div class="crop tl"></div><div class="crop tr"></div><div class="crop bl"></div><div class="crop br"></div><!-- Dimension Line --><div class="flex items-center gap-2 mb-8 text-[10px] tracking-wider uppercase opacity-60"><div class="w-2 h-2 bg-black"></div><span>CMS SECURE ACCESS PORTAL</span><div class="flex-grow h-[1px] bg-[var(--border-color)]"></div><span>SECURE_ID: 104-98</span></div><div class="mb-8"><h1 class="text-2xl font-bold uppercase tracking-tight text-black mb-1">CREATIVA STUDIO</h1><p class="text-xs text-[var(--text-secondary)] uppercase tracking-widest">Administrative Panel Gateway</p></div>${errorMessage && renderTemplate`<div class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-none font-medium flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><span>${errorMessage}</span></div>`}<form method="POST" class="space-y-6"><div><label for="username" class="block text-[11px] font-bold uppercase tracking-wider text-black mb-2">Username</label><input type="text" id="username" name="username" required class="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm rounded-none text-black focus:outline-none focus:border-black transition-colors" placeholder="Masukkan username" autocomplete="username"></div><div><label for="password" class="block text-[11px] font-bold uppercase tracking-wider text-black mb-2">Password</label><input type="password" id="password" name="password" required class="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm rounded-none text-black focus:outline-none focus:border-black transition-colors" placeholder="Masukkan password" autocomplete="current-password"></div><button type="submit" class="w-full btn-brutal btn-brutal-accent mt-2 py-4 text-xs font-bold tracking-widest uppercase">Masuk Ke CMS</button></form><!-- Bottom metadata --><div class="mt-8 pt-6 border-t border-[var(--line)] flex justify-between items-center text-[9px] font-mono tracking-widest uppercase opacity-50"><span>© 2026 CREATIVA</span><span>GATE: 0.00 M</span></div></div></body></html>`;
}, "/media/galangpradhana/DATA/galang/Projek Web/web-kontraktor/src/pages/login-cms.astro", void 0);
var $$file = "/media/galangpradhana/DATA/galang/Projek Web/web-kontraktor/src/pages/login-cms.astro";
var $$url = "/login-cms";
//#endregion
//#region \0virtual:astro:page:src/pages/login-cms@_@astro
var page = () => login_cms_exports;
//#endregion
export { page };
