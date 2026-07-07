import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // Keystatic Cloud menangani autentikasi sendiri — tidak perlu proteksi middleware di sini.
  // Semua rute /keystatic dan /api/keystatic diizinkan lewat agar Keystatic Cloud bisa berjalan.
  return next();
});
