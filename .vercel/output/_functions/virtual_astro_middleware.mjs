import { F as sequence, q as defineMiddleware } from "./chunks/render_BLk4hTKR.mjs";
import { n as verifyToken } from "./chunks/auth_CPrzKIvb.mjs";
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(defineMiddleware(async (context, next) => {
	const url = new URL(context.request.url);
	if (url.pathname.startsWith("/keystatic")) {
		const authCookie = context.cookies.get("keystatic-auth");
		if (!(authCookie && authCookie.value && verifyToken(authCookie.value))) {
			if (url.pathname.startsWith("/keystatic/api")) return new Response("Unauthorized", { status: 401 });
			return context.redirect(`/login-cms?redirect=${encodeURIComponent(url.pathname)}`);
		}
	}
	return next();
}));
//#endregion
export { onRequest };
