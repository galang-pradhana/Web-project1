# 🚀 Panduan Lengkap Migrasi Cloudinary ke Cloudflare R2

Dokumen ini berisi panduan step-by-step untuk memindahkan asset (gambar & video) dari Cloudinary ke Cloudflare R2 agar website tidak terkena limit kuota bulanan lagi.

---

## 📋 Ringkasan Arsitektur Baru

```
[Keystatic CMS / Admin]
       │
       ▼
[Page /admin/upload-media] ──(FormData Upload)──► [Cloudflare Worker API]
                                                         │
                                                         ▼
[Astro Frontend] ◄────(Public URL / Custom Domain)──── [Cloudflare R2 Bucket]
```

- **Storage**: Cloudflare R2 Bucket (`djc-media`)
- **Upload API**: Cloudflare Worker (`workers/r2-upload-worker/index.js`)
- **Penanganan Image Optimization**: Kompresi manual sebelum diunggah (rekomendasi WebP / MP4 h264).

---

## 🛠️ Langkah 1: Setup Cloudflare R2 Bucket

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/) dan login.
2. Di menu navigasi sebelah kiri, klik **R2**.
3. Klik tombol **Create Bucket**.
4. Masukkan nama bucket: `djc-media` lalu pilih opsi lokasi **Automatic**, kemudian klik **Create Bucket**.
5. Setelah bucket dibuat, buka tab **Settings** di bucket `djc-media`:
   - Di bagian **Public Access**, klik **Connect Domain** (jika menggunakan custom domain seperti `media.djckontraktor.com`).
   - *Atau* aktifkan **R2.dev Subdomain** (opsi gratis langsung dari Cloudflare, contoh: `https://pub-xxx.r2.dev`).
6. Catat URL Public R2 Anda!

---

## ⚡ Langkah 2: Deploy Cloudflare Worker Upload API

File worker sudah disiapkan di folder `workers/r2-upload-worker/`.

1. Buka terminal di folder project:
   ```bash
   cd workers/r2-upload-worker
   ```
2. Pastikan file `wrangler.toml` sudah sesuai:
   ```toml
   name = "djc-r2-uploader"
   main = "index.js"
   compatibility_date = "2024-01-01"

   [[r2_buckets]]
   binding = 'MY_R2_BUCKET'
   bucket_name = 'djc-media'

   [vars]
   PUBLIC_R2_DOMAIN = "https://media.djckontraktor.com" # Ubah dengan R2 Public URL / Custom Domain Anda
   UPLOAD_SECRET = "archbrutal-cms-secret-key-change-this"
   ```
3. Deploy Worker ke Cloudflare:
   ```bash
   npx wrangler deploy
   ```
4. Setelah deploy selesai, terminal akan menampilkan URL Worker Anda, contoh: `https://djc-r2-uploader.username.workers.dev`.

---

## 🔑 Langkah 3: Konfigurasi File Environment `.env`

Buka file `.env` di root project Anda, lalu isi variabel R2:

```env
PUBLIC_R2_WORKER_URL="https://djc-r2-uploader.username.workers.dev"
PUBLIC_R2_PUBLIC_DOMAIN="https://media.djckontraktor.com" # atau R2.dev domain
R2_UPLOAD_SECRET="archbrutal-cms-secret-key-change-this"
```

---

## 📦 Langkah 4: Migrasi Asset Cloudinary Lama

Karena kuota Cloudinary saat ini sedang terkena limit (HTTP 401), ada 2 pilihan untuk mengunggah berkas lama ke R2:

### Opsi A: Jika Kuota Reset / Memiliki File Backup Lokal
1. Jalankan script otomatis berikut untuk mengunduh semua asset Cloudinary ke folder `cloudinary-backup/`:
   ```bash
   node scripts/download-cloudinary.js
   ```
2. Upload semua file yang ada di folder `cloudinary-backup/` langsung dari **Cloudflare Dashboard > R2 > djc-media > Upload**.

### Opsi B: Mengganti URL di Codebase ke R2
Setelah semua asset diupload ke R2 Bucket dengan nama file yang sama:
1. Jalankan script pengganti URL otomatis di terminal:
   ```bash
   node scripts/replace-cloudinary-urls.js "https://media.djckontraktor.com"
   ```
2. Script ini akan secara otomatis memperbarui **115 URL Cloudinary** yang tersebar di `src/content/*.json` dan `src/components/Hero.astro` menjadi URL Cloudflare R2!

---

## 💻 Langkah 5: Menggunakan Portal Media Baru

1. Akses halaman admin: `https://domain-anda.com/admin/upload-media`
2. Klik tombol **PILIH BERKAS (CLOUDFLARE R2)**.
3. Pilih gambar atau video dari komputer Anda.
4. Portal media akan mengunggah file ke Cloudflare R2 via Worker dan menghasilkan URL publik instan.
5. Klik **SALIN URL** dan tempel (paste) ke **Keystatic CMS** (`/keystatic`).

---

## 🔍 Ringkasan File Baru & Perubahan Codebase

- 📄 `workers/r2-upload-worker/index.js` — Script Cloudflare Worker API upload
- 📄 `workers/r2-upload-worker/wrangler.toml` — Konfigurasi deploy Wrangler
- 📄 `scripts/download-cloudinary.js` — Script backup downloader asset Cloudinary
- 📄 `scripts/replace-cloudinary-urls.js` — Script batch update URL Cloudinary ke R2
- 📄 `src/pages/admin/upload-media.astro` — Antarmuka portal media terintegrasi R2
- 📄 `.env` & `.env.example` — Variabel konfigurasi environment baru
