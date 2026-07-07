# Proteksi Keystatic CMS dengan Halaman Login & Middleware Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Memproteksi antarmuka admin Keystatic CMS menggunakan halaman login kustom dan Astro Middleware berbasis kredensial `.env`, serta mengubah output Astro ke mode `hybrid` untuk mengatasi isu *blank screen* saat dev.

**Architecture:** Kita akan mengubah output mode Astro menjadi `hybrid` agar route Keystatic (/keystatic & /api/keystatic) dapat berjalan secara dinamis sebagai SSR. Sebuah Astro Middleware akan mendeteksi akses ke route tersebut dan memvalidasi cookie session menggunakan token bertanda tangan (*signed token*) digital berbasis HMAC SHA-256 secara *stateless*. Jika tidak valid, user akan dialihkan ke halaman login kustom `/login-cms`.

**Tech Stack:** Astro, Tailwind CSS, Keystatic Core, Node:Crypto.

---

### Task 1: Konfigurasi Mode Hybrid & Environment Variables

**Files:**
- Modify: `astro.config.mjs`
- Modify: `.env`
- Modify: `.env.example`

**Step 1: Ubah output Astro ke hybrid**
Ubah `output: 'static'` menjadi `output: 'hybrid'` pada berkas `astro.config.mjs`.

**Step 2: Tambahkan variabel env baru**
Tambahkan kredensial admin berikut pada berkas `.env` dan `.env.example`:
```ini
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="creativa2026"
```

**Step 3: Commit**
```bash
git add astro.config.mjs .env .env.example
git commit -m "config: switch astro output to hybrid and add admin env credentials"
```

---

### Task 2: Implementasi helper autentikasi stateless

**Files:**
- Create: `src/utils/auth.ts`

**Step 1: Buat berkas helper auth.ts**
Buat modul utilitas untuk enkripsi, pembuatan token hmac, dan validasi cookie.
Gunakan implementasi berikut:
```typescript
import crypto from 'node:crypto';

const SECRET = process.env.KEYSTATIC_SECRET || 'archbrutal-cms-secret-key-change-this';

export function generateToken(username: string, timestamp: number): string {
  const data = `${username}:${timestamp}`;
  return crypto.createHmac('sha256', SECRET).update(data).digest('hex');
}

export function verifyToken(cookieValue: string): boolean {
  try {
    const [username, timestampStr, signature] = cookieValue.split(':');
    if (!username || !timestampStr || !signature) return false;
    
    const timestamp = parseInt(timestampStr, 10);
    const now = Date.now();
    
    // Token valid selama 1 hari (86.400.000 ms)
    if (now - timestamp > 86400000 || now < timestamp) return false;
    
    const expectedSignature = generateToken(username, timestamp);
    
    // Gunakan timingSafeEqual untuk mencegah timing attack
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch (e) {
    return false;
  }
}
```

**Step 2: Commit**
```bash
git add src/utils/auth.ts
git commit -m "feat: add secure stateless authentication helpers"
```

---

### Task 3: Implementasi Security Middleware

**Files:**
- Create: `src/middleware.ts`

**Step 1: Buat berkas middleware.ts**
Intersep rute `/keystatic` dan `/api/keystatic` (kecuali static asset).
Gunakan implementasi berikut:
```typescript
import { defineMiddleware } from 'astro:middleware';
import { verifyToken } from './utils/auth';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  
  // Hanya proteksi rute utama Keystatic, lewati jika itu adalah pemanggilan file statik (.css, .js, dll)
  if (url.pathname.startsWith('/keystatic') || url.pathname.startsWith('/api/keystatic')) {
    // Jika path menuju file asset (misal berkas js/css keystatic internal), lewati
    if (url.pathname.includes('.') && !url.pathname.endsWith('/')) {
      return next();
    }
    
    const sessionCookie = context.cookies.get('cms_session')?.value;
    
    if (!sessionCookie || !verifyToken(sessionCookie)) {
      // Redirect ke login page jika session tidak valid
      return context.redirect('/login-cms');
    }
  }
  
  return next();
});
```

**Step 2: Commit**
```bash
git add src/middleware.ts
git commit -m "feat: add security middleware for keystatic endpoints"
```

---

### Task 4: Membuat Antarmuka Halaman Login

**Files:**
- Create: `src/pages/login-cms.astro`

**Step 1: Buat halaman login-cms.astro**
Implementasikan halaman login SSR premium dengan gaya minimalis, form submission dinamis, visual shake error, dan keamanan cookie secure.
Pastikan `export const prerender = false;` diletakkan di baris paling atas agar Astro merendernya secara server-side.

**Step 2: Commit**
```bash
git add src/pages/login-cms.astro
git commit -m "feat: implement high-fidelity login interface for CMS"
```

---

### Task 5: Validasi & Uji Coba

**Files:**
- Test: Menjalankan dev server dan build

**Step 1: Jalankan npm run build**
Lakukan build lokal untuk memverifikasi proses build hybrid berjalan sukses.

**Step 2: Uji fungsional login via subagent**
Verifikasi pengalihan (redirect) dari `/keystatic` ke `/login-cms` dan proses autentikasi berhasil masuk ke dashboard.
