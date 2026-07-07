# RAB Calculator Finalization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Menyelesaikan integrasi kalkulator RAB ArchBrutal dengan Supabase untuk penyimpanan sesi kalkulasi dinamis, lead capture otomatis dari kalkulator cepat, dan halaman hasil kalkulasi yang dapat dibagikan.

**Architecture:** 
1. **Dynamic Route (`src/pages/rab/hasil/[id].astro`)**: Mengambil data kalkulasi dan lead dari Supabase berdasarkan UUID di URL parameter, lalu me-render komponen `DetailEstimator` dengan data tersebut sebagai `initialData`.
2. **QuickEstimator Integration (`src/components/QuickEstimator.tsx`)**: Menambahkan background save ke `/api/rab-save` dan lead capture ke `/api/rab-lead` saat tombol kirim WhatsApp diklik, agar data calon klien tidak hilang.

**Tech Stack:** Astro, React, Supabase REST API (via fetch), Keystatic CMS.

---

### Task 1: Membuat Halaman Dynamic Route Hasil Kalkulasi

**Files:**
- Create: `src/pages/rab/hasil/[id].astro`

**Step 1: Definisikan rute dinamis hasil kalkulasi**
Membuat file Astro baru untuk mengambil data kalkulasi dari Supabase dan menampilkannya menggunakan `DetailEstimator`. Jika ID tidak ditemukan, tampilkan pesan error bergaya brutalist.

*(Code exactly matches the system implementation plan)*

---

### Task 2: Integrasi Lead Capture Supabase pada QuickEstimator

**Files:**
- Modify: `src/components/QuickEstimator.tsx`

**Step 1: Tambahkan loading state dan ganti form submit**
Update `QuickEstimator.tsx` agar menyimpan data kalkulasi kasar dan lead ke Supabase sebelum membuka tautan WhatsApp. Jika Supabase gagal, gunakan fallback langsung membuka tautan WhatsApp agar pengguna tidak terblokir.

*(Code exactly matches the system implementation plan)*

---

### Task 3: Verifikasi Build Produksi

**Step 1: Jalankan build**
Jalankan `npm run build` untuk memverifikasi tidak ada kesalahan kompilasi TypeScript atau rute statis/SSR.
