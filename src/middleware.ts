import { defineMiddleware } from 'astro:middleware';
import { verifyToken } from './utils/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  console.log(`[Middleware] Request path: ${url.pathname}`);
  
  // Lindungi semua rute UI /keystatic dan API /api/keystatic
  if (url.pathname.startsWith('/keystatic') || url.pathname.startsWith('/api/keystatic')) {
    const authCookie = context.cookies.get('keystatic-auth');
    const cookieVal = authCookie ? authCookie.value : 'none';
    const isAuthorized = authCookie && authCookie.value && verifyToken(authCookie.value);
    
    console.log(`[Middleware] Path: ${url.pathname}, Cookie: ${cookieVal}, Authorized: ${isAuthorized}`);
    
    if (!isAuthorized) {
      // Jika rute adalah API dari Keystatic, kembalikan status 401 Unauthorized
      if (url.pathname.startsWith('/api/keystatic')) {
        console.log(`[Middleware] Unauthorized API access, returning 401`);
        return new Response('Unauthorized', { status: 401 });
      }
      
      const targetRedirect = `/login-cms?redirect=${encodeURIComponent(url.pathname)}`;
      console.log(`[Middleware] Unauthorized page access, redirecting to: ${targetRedirect}`);
      return context.redirect(targetRedirect);
    }
    
    console.log(`[Middleware] Authorized access allowed`);
  }
  
  return next();
});
