# MASTER PROMPT — Website Arsitek & Kontraktor (Astro + CMS + RAB Calculator)

> Salin seluruh isi file ini dan tempel ke AI coding agent (Claude Code, Cursor, v0, dll) sebagai instruksi awal pembuatan proyek.

---

## 1. RINGKASAN PROYEK

Buatkan website company profile untuk jasa **arsitek & kontraktor interior/bangunan**, dengan gaya visual **dark Brutalism** (mengacu pada referensi desain: dark theme, tipografi besar, banyak whitespace, foto interior high-contrast, tombol outline persegi tanpa rounded corner, garis pembatas tegas).

Website harus:
- **Mobile-first** dan **fully responsive** (tidak boleh ada elemen rusak/overflow di layar HP, termasuk saat scroll parallax).
- Memiliki **CMS** agar admin non-teknis bisa mengubah konten (teks, gambar, portofolio, harga material) tanpa sentuh kode.
- Memiliki fitur **kalkulator RAB (Rencana Anggaran Biaya)** interaktif.
- Menggunakan **animasi scroll parallax** yang smooth di desktop maupun mobile (tanpa jank/lag).
- Bisa **dideploy ke Vercel** langsung dari repo Git.

---

## 2. TECH STACK (WAJIB)

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | **Astro 4.x** (dengan output `hybrid`/`server` via adapter Vercel) | Performa tinggi, island architecture, cocok untuk konten statis + interaktif |
| Styling | **Tailwind CSS** (+ plugin `@tailwindcss/typography`) | Cepat untuk styling brutalism yang presisi & konsisten di breakpoint |
| Interaktivitas komponen | **React** islands (`@astrojs/react`) khusus untuk komponen kalkulator RAB & form | Astro islands = tidak membebani halaman statis lain |
| Animasi Parallax | **GSAP + ScrollTrigger** dikombinasikan dengan **Lenis** (smooth scroll) | Paling stabil untuk parallax cross-device, ada fallback `prefers-reduced-motion` |
| CMS | **Sanity.io** (headless, gratis untuk skala kecil, real-time preview, image CDN bawaan) — *alternatif budget-zero:* **Keystatic** (Git-based CMS, langsung nyatu di repo Astro, tanpa biaya hosting CMS) | Sanity dipilih utama karena studio CMS terpisah gampang dipakai klien non-teknis; sebutkan opsi Keystatic sebagai fallback jika ingin 100% gratis & self-hosted di repo |
| Database tambahan (opsional untuk lead & data harga RAB) | **Supabase (Postgres)** | Untuk menyimpan submission form kontak & histori kalkulasi RAB user |
| Hosting/Deploy | **Vercel** (`@astrojs/vercel` adapter, mode `serverless`) | Wajib support API routes untuk endpoint kalkulasi RAB & webhook revalidate CMS |
| Bahasa | TypeScript di seluruh project | Type-safety untuk schema CMS & formula RAB |
| Font | Kombinasi **serif dramatis untuk heading** (mis. "Fraunces" atau "Playfair Display") + **sans/mono untuk body & label** (mis. "Inter"/"Space Mono") sesuai gaya brutalism-elegant di referensi | Konsisten dengan referensi visual (judul besar bergaya editorial) |

---

## 3. ARAHAN DESAIN (BRUTALISM x RESPONSIVE)

Ikuti prinsip **Neo-Brutalism yang tetap usable**, bukan brutalism ekstrem yang merusak UX:

- **Palet warna**: dominan dark (#0D0D0D / #1A1A1A) dengan aksen off-white (#F5F1EA) dan satu warna aksen hangat (gold/amber #C9A15A) untuk CTA & highlight.
- **Tipografi**: heading besar (clamp 32px–72px), huruf kapital untuk section title (mis. "MI ĮE LIDERAMI DALAM ARSITEKTUR"), letter-spacing lebar.
- **Tombol**: kotak/persegi (border-radius: 0), border 1–2px solid, hover invert warna (bg jadi putih, teks jadi hitam).
- **Grid**: gunakan CSS grid asimetris (foto besar + foto kecil bertumpuk, seperti referensi), tapi WAJIB reflow jadi single column di mobile tanpa memotong gambar penting.
- **Border/garis tegas**: garis pembatas antar section 1px solid warna aksen/putih transparan, ciri khas brutalism.
- **Foto**: full-bleed, sedikit desaturasi/dark overlay agar teks tetap terbaca (kontras minimal AA untuk aksesibilitas).
- **Mobile**: perkecil ukuran font secara proporsional (pakai `clamp()`), padding section dikurangi tapi tetap ada breathing room, hindari elemen absolute yang bisa overflow horizontal (`overflow-x: hidden` di `<body>` sebagai safety net, tapi tidak boleh jadi solusi utama — cek tiap section).

---

## 4. STRUKTUR HALAMAN

1. **Home**
   - Hero fullscreen dengan foto interior + parallax layer (foreground foto bergerak lebih cepat dari background saat scroll).
   - Section "Kami adalah pemimpin dalam arsitektur" (teks + CTA "Lihat Selengkapnya").
   - Section showcase project unggulan (foto besar interaktif).
   - Section "Kasus/Portofolio" — grid 4 foto (dari CMS, dinamis).
   - Section kalkulator RAB ringkas (CTA ke halaman kalkulator lengkap).
   - Section kontak/lead form.
2. **Portofolio/Kasus** — listing semua project dari CMS, filter by kategori (residential/komersial/renovasi).
3. **Detail Project** — dynamic route `[slug].astro`, galeri foto, deskripsi, luas bangunan, budget range, testimoni klien.
4. **Layanan** — daftar jasa (desain arsitektur, interior, kontraktor bangun, renovasi) dari CMS.
5. **Kalkulator RAB** (halaman khusus, lihat detail di bagian 5).
6. **Tentang Kami** — profil tim/perusahaan.
7. **Kontak** — form lead + integrasi WhatsApp click-to-chat + Google Maps embed.
8. **/admin atau /studio** — akses ke CMS studio (jika pakai Sanity Studio embedded, atau Keystatic admin UI).

---

## 5. FITUR KALKULATOR RAB (WAJIB — DETAIL)

Buat komponen React island `RABCalculator.tsx` dengan logika berikut:

**Input dari user:**
- Luas bangunan (m²) — number input.
- Jenis pekerjaan — select: `Bangun Baru`, `Renovasi`, `Interior Saja`.
- Tingkat kualitas material — select: `Standar`, `Menengah`, `Premium`.
- Jumlah lantai — number input.
- Jumlah kamar (opsional, untuk estimasi lebih detail).

**Sumber data harga:**
- Harga satuan per m² per kategori kualitas **disimpan & dikelola lewat CMS** (bukan hardcode), contoh schema:
  ```
  RABPricing {
    kategori: "Standar" | "Menengah" | "Premium",
    hargaPerM2: number,
    jenisPekerjaan: "Bangun Baru" | "Renovasi" | "Interior",
    updatedAt: datetime
  }
  ```
  Admin bisa update harga per m² kapan saja lewat CMS tanpa deploy ulang.

**Logika kalkulasi (client-side + validasi server-side):**
```
estimasiBiaya = luasBangunan * hargaPerM2(kategori, jenisPekerjaan) * faktorLantai
faktorLantai = 1 + (0.15 * (jumlahLantai - 1))   // biaya tambahan tiap lantai ekstra
```
- Tampilkan hasil sebagai **range** (misal ±15%) bukan angka pasti, untuk menghindari kesan komitmen harga fix.
- Tampilkan **breakdown** sederhana (biaya struktur, finishing, MEP — bisa persentase tetap dari total, dikonfigurasi di CMS).
- Sediakan **API route** `/api/rab-calculate.ts` (Astro endpoint, `export const prerender = false`) yang menerima input via POST, mengambil harga terbaru dari CMS/DB, mengembalikan hasil JSON — supaya formula & harga tidak bisa dimanipulasi dari devtools client.
- Setelah hasil muncul, tampilkan CTA "Konsultasi Gratis" yang membuka form lead (simpan ke Supabase + kirim notifikasi email/WhatsApp via webhook).
- Simpan setiap hasil kalkulasi ke tabel `rab_submissions` (Supabase) untuk keperluan follow-up sales, termasuk data kontak jika user mengisi.

---

## 6. ANIMASI SCROLL PARALLAX

- Gunakan **Lenis** untuk smooth-scroll di seluruh halaman.
- Gunakan **GSAP ScrollTrigger** untuk:
  - Parallax foto hero (foto bergerak lebih lambat dari konten teks).
  - Fade + slide-up untuk setiap section saat masuk viewport.
  - Efek "sticky reveal" pada section showcase project (opsional, seperti foto besar yang zoom-out sedikit saat discroll, mengikuti referensi desain).
- **WAJIB**: cek `window.matchMedia('(prefers-reduced-motion: reduce)')` — jika user mengaktifkan reduce motion, matikan parallax dan tampilkan konten statis.
- **WAJIB**: matikan/reduksi parallax effect berat (`will-change`, transform 3D besar) di breakpoint mobile (<768px) untuk menjaga performa & mencegah layout shift/patah-patah di HP low-end. Gunakan `matchMedia` breakpoint check sebelum inisialisasi ScrollTrigger yang berat.
- Test wajib: pastikan tidak ada **horizontal scroll/overflow** yang muncul akibat elemen parallax yang ditranslasikan keluar viewport.

---

## 7. CMS — SCHEMA KONTEN (Sanity/Keystatic)

Buat content types berikut agar semua bagian visual di atas bisa diedit oleh admin:

1. `siteSettings` — logo, nama brand, kontak (telepon/WA/email/alamat), social links.
2. `heroSection` — headline, subheadline, foto background, CTA text & link.
3. `aboutSection` — judul, paragraf deskripsi, CTA.
4. `service` — nama layanan, ikon/foto, deskripsi singkat.
5. `project` (portofolio/kasus) — judul, slug, kategori, foto cover, galeri foto, luas bangunan, lokasi, testimoni, tahun.
6. `rabPricing` — (lihat skema di bagian 5).
7. `testimonial` — nama klien, foto, isi testimoni, rating.
8. `leadSubmission` (read-only view dari Supabase, atau simpan langsung di Sanity jika tidak pakai Supabase).

Pastikan setiap **gambar via CMS otomatis dioptimasi** (pakai `@sanity/image-url` + `astro:assets` atau built-in Sanity CDN transform) supaya tidak ada gambar raw besar yang merusak performa mobile.

---

## 8. PERFORMA, SEO & AKSESIBILITAS

- Skor **Lighthouse mobile minimal 90** untuk Performance, Accessibility, SEO.
- Gunakan `astro:assets` (`<Image />`) untuk semua gambar statis, lazy-load semua gambar di luar viewport pertama.
- Meta tag dinamis per halaman (title, description, OG image) — ambil dari CMS jika tersedia, fallback ke default.
- Struktur heading semantik (`h1` hanya satu per halaman).
- Kontras warna teks-di-atas-foto minimal WCAG AA (pakai overlay gradient gelap di belakang teks jika perlu).
- Sitemap.xml & robots.txt otomatis via `@astrojs/sitemap`.

---

## 9. STRUKTUR FOLDER YANG DIHARAPKAN

```
/src
  /components
    /rab (RABCalculator.tsx, RABResult.tsx)
    /ui  (Button.astro, Section.astro, ParallaxImage.astro)
    Navbar.astro
    Footer.astro
  /layouts
    BaseLayout.astro
  /pages
    index.astro
    layanan.astro
    portofolio/[slug].astro
    kalkulator-rab.astro
    kontak.astro
    /api
      rab-calculate.ts
      submit-lead.ts
  /lib
    sanity.ts (client Sanity)
    supabase.ts
    rab-formula.ts
  /styles
    global.css (Tailwind base + custom brutalism utilities)
/sanity (skema Sanity Studio jika embedded)
astro.config.mjs (adapter: @astrojs/vercel, output: 'hybrid')
tailwind.config.mjs
```

---

## 10. DEPLOYMENT KE VERCEL

- Konfigurasi `astro.config.mjs` menggunakan `@astrojs/vercel/serverless` sebagai adapter, `output: 'hybrid'` (halaman statis tetap prerender, API routes & kalkulator RAB server-side).
- Environment variables yang dibutuhkan di Vercel dashboard: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN` (read), `SUPABASE_URL`, `SUPABASE_ANON_KEY`.
- Setup **webhook revalidate**: saat konten di CMS diubah → trigger Vercel deploy hook (untuk konten yang di-prerender) atau gunakan ISR-like on-demand revalidation jika halaman menggunakan mode `server`.
- Pastikan build command: `astro build`, output otomatis terdeteksi Vercel sebagai project Astro.

---

## 11. CHECKLIST PENERIMAAN (ACCEPTANCE CRITERIA)

- [ ] Semua section dari desain referensi (hero, "leader in architecture", showcase project, kasus/portofolio, contact form) sudah dibuat dan responsif.
- [ ] Tidak ada horizontal overflow di lebar viewport 320px–1920px.
- [ ] Parallax berjalan halus di desktop, dan otomatis lebih ringan/nonaktif di mobile & saat `prefers-reduced-motion`.
- [ ] Admin bisa login ke CMS dan mengubah: teks hero, foto portofolio, harga RAB per kategori — tanpa developer.
- [ ] Kalkulator RAB menghasilkan estimasi berbeda sesuai kombinasi input, dan angka harga bersumber dari CMS (bukan hardcoded di frontend).
- [ ] Form kontak & hasil kalkulasi RAB tersimpan (di Supabase/CMS) dan bisa dicek admin.
- [ ] Lighthouse mobile score ≥ 90 di Performance, Accessibility, SEO, Best Practices.
- [ ] Project berhasil di-deploy ke Vercel dari repo Git dengan environment variables yang benar.

---

*Catatan tambahan untuk AI agent: jika ada bagian teknis yang ambigu (misal pilih Sanity vs Keystatic), utamakan opsi yang lebih cepat diimplementasikan dan tetap dalam anggaran gratis/hemat (Keystatic) kecuali user secara eksplisit meminta Sanity untuk kebutuhan multi-editor/enterprise.*
