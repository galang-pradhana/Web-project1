# DETAIL PROMPT — Fitur Kalkulator RAB (Rencana Anggaran Biaya)

> File ini adalah pelengkap dari `prompt-website-arsitek-kontraktor.md`. Fokus khusus di fitur RAB agar hasilnya maksimal & benar-benar bisa dipakai calon konsumen untuk estimasi biaya bangun/renovasi. Tempel file ini bersamaan dengan master prompt ke AI coding agent.

---

## 1. TUJUAN FITUR

Kalkulator RAB di website ini punya 2 tujuan sekaligus:
1. **Lead generation** — calon klien dapat estimasi cepat → tertarik → isi kontak → jadi leads sales.
2. **Tools kredibilitas** — hasil estimasi harus terasa profesional & berbasis data nyata (AHSP/SNI), bukan sekadar tebak-tebakan, supaya klien percaya pada keahlian kontraktor.

Fitur dibuat dalam **2 mode bertingkat**:
- **Mode 1 — Estimasi Cepat** (tampil di homepage & jadi entry point utama, wajib ringan & cepat diisi).
- **Mode 2 — Estimasi Detail per Pekerjaan** (halaman khusus `/kalkulator-rab`, untuk user yang ingin hasil lebih presisi, berbasis AHSP-SNI seperti estimator.id/analisahargasatuan.com).

---

## 2. METODOLOGI PERHITUNGAN (WAJIB DIIKUTI)

Gunakan metode **AHSP (Analisa Harga Satuan Pekerjaan)** berbasis SNI/PUPR — bukan harga per m² yang statis dan asal tebak. Konsepnya:

```
Harga Satuan 1 Item Pekerjaan =
    Σ (koefisien_bahan × harga_bahan_terkini)
  + Σ (koefisien_upah  × harga_upah_terkini)
  + Σ (koefisien_alat  × harga_alat_terkini)

Biaya Item Pekerjaan = Harga Satuan × Volume Pekerjaan

Total RAB = Σ Biaya semua Item Pekerjaan + Biaya Overhead & Profit (%) + PPN (jika perlu ditampilkan)
```

Koefisien AHSP bersifat **baku/tidak sering berubah** (sudah ditetapkan standar SNI). Yang berubah adalah **harga bahan, harga upah, dan harga alat** — sehingga struktur data CMS WAJIB memisahkan "resep/koefisien" dari "harga pasar terkini", agar admin hanya perlu update harga tanpa sentuh formula.

---

## 3. SCHEMA CMS — 4 CONTENT TYPE UTAMA

### 3.1 `hargaBahan` (Master Harga Material)
```ts
{
  _id: string,
  nama: string,              // "Semen Portland (PC) 50kg"
  satuan: "kg" | "m3" | "m2" | "buah" | "batang" | "lonjor" | "sak" | "liter",
  hargaSatuan: number,       // Rp
  kategori: "Semen & Beton" | "Kayu" | "Besi & Baja" | "Keramik" | "Cat" | "Pipa & Sanitair" | "Kelistrikan" | "Atap" | "Lainnya",
  lokasi: string,             // "Jakarta" | "Bandung" | dst — untuk multi-kota
  supplier?: string,
  gambar?: image,
  updatedAt: datetime,
  riwayatHarga: [ { harga: number, tanggal: datetime } ]  // untuk tracking histori kenaikan harga
}
```

### 3.2 `hargaUpah` (Master Harga Tenaga Kerja)
```ts
{
  _id: string,
  jenisPekerja: "Pekerja" | "Tukang Batu" | "Tukang Kayu" | "Tukang Besi" | "Tukang Cat" | "Kepala Tukang" | "Mandor" | "Operator Alat",
  satuan: "OH", // Orang-Hari
  hargaSatuan: number,
  lokasi: string,
  updatedAt: datetime
}
```

### 3.3 `ahspItem` (Analisa Harga Satuan Pekerjaan / "Resep")
```ts
{
  _id: string,
  kodeAHSP?: string,          // referensi kode SNI/PUPR, contoh "A.4.1.1.1"
  namaPekerjaan: string,      // "Pasangan Bata Merah 1PC:4PP"
  kategoriPekerjaan: "Pekerjaan Persiapan" | "Pekerjaan Tanah" | "Pekerjaan Pondasi" |
                      "Pekerjaan Struktur (Beton/Kolom/Balok)" | "Pekerjaan Dinding" |
                      "Pekerjaan Atap" | "Pekerjaan Plafon" | "Pekerjaan Lantai" |
                      "Pekerjaan Pintu & Jendela" | "Pekerjaan Sanitair" |
                      "Pekerjaan Listrik" | "Pekerjaan Finishing/Cat" | "Pekerjaan Lainnya",
  satuanVolume: "m3" | "m2" | "m1" | "unit" | "titik" | "ls",
  komponen: [
    { tipe: "bahan" | "upah" | "alat", referensiId: string, koefisien: number }
  ],
  catatan?: string
}
```

### 3.4 `rabPaket` (Paket Estimasi Cepat — untuk Mode 1)
```ts
{
  _id: string,
  namaPaket: "Standar" | "Menengah" | "Premium",
  jenisPekerjaan: "Bangun Baru" | "Renovasi Total" | "Renovasi Sebagian" | "Interior Saja",
  hargaPerM2: number,          // hasil agregat riil dari kalkulasi ahspItem tim estimator, bukan tebakan
  komposisiPersen: {
    struktur: number, dinding: number, atap: number,
    finishing: number, mep: number, lainnya: number
  }, // total harus 100
  deskripsiSingkat: string,    // ditampilkan ke user, mis. "Cocok untuk hunian standar dengan material kelas ekonomis-menengah"
  contohMaterial: string[],    // list contoh material yang dipakai di tingkat ini, untuk transparansi ke user
  updatedAt: datetime
}
```

> **Catatan penting untuk admin non-teknis**: `hargaPerM2` di `rabPaket` sebaiknya di-generate ulang secara periodik (misal tiap 3 bulan) oleh tim estimator internal berdasarkan hasil rata-rata kalkulasi Mode 2, BUKAN angka yang mengambang tanpa dasar — supaya kredibilitas terjaga dan legal-safe (tidak dianggap menyesatkan konsumen).

### 3.5 `rabSettings` (Konfigurasi global, opsional tapi disarankan)
```ts
{
  overheadProfitPersen: number,   // default mis. 10%
  toleransiEstimasi: number,      // default 15%, untuk tampilkan range ±
  tampilkanPPN: boolean,
  lokasiAktif: string[]           // daftar kota yang harganya tersedia
}
```

---

## 4. MODE 1 — ESTIMASI CEPAT (di Homepage)

**Form input (maksimal 4 field, mobile-friendly, gunakan step-wizard bukan form panjang sekaligus):**
1. Jenis pekerjaan → pilihan chip/button: `Bangun Baru` / `Renovasi` / `Interior Saja`
2. Luas bangunan (m²) → input angka + slider
3. Tingkat kualitas material → 3 kartu visual (Standar/Menengah/Premium) dengan preview gambar material & harga per m² ditampilkan transparan
4. Jumlah lantai → stepper +/-

**Formula:**
```
estimasiDasar = luasBangunan × rabPaket.hargaPerM2
faktorLantai = 1 + (0.12 × (jumlahLantai - 1))   // biaya tambah per lantai ekstra (struktur lebih kompleks)
estimasiTotal = estimasiDasar × faktorLantai
rangeBawah = estimasiTotal × (1 - toleransiEstimasi)
rangeAtas  = estimasiTotal × (1 + toleransiEstimasi)
```

**Output ke user (WAJIB tampilan seperti ini, bukan angka polos):**
- Range harga besar & jelas: "Rp 850.000.000 – Rp 1.150.000.000"
- Breakdown visual (donut/bar chart sederhana) sesuai `komposisiPersen`: Struktur, Dinding, Atap, Finishing, MEP.
- Disclaimer kecil di bawah hasil: *"Estimasi ini bersifat indikatif berdasarkan data AHSP & harga material terkini. Untuk RAB akurat sesuai gambar kerja, konsultasikan dengan tim kami."*
- CTA besar: **"Dapatkan RAB Detail Gratis dari Tim Kami"** → membuka form lead (nama, WA, email, catatan) yang otomatis membawa data hasil kalkulasi.
- Tombol sekunder: **"Coba Estimasi Detail"** → mengarahkan ke Mode 2.

---

## 5. MODE 2 — ESTIMASI DETAIL PER PEKERJAAN (Halaman `/kalkulator-rab`)

Untuk user yang serius dan ingin hasil presisi. UX-nya seperti "keranjang belanja pekerjaan":

**Alur:**
1. User pilih kategori pekerjaan (accordion, sesuai `kategoriPekerjaan` di CMS): Pekerjaan Pondasi, Dinding, Atap, dst.
2. Di setiap kategori, tampilkan daftar `ahspItem` yang relevan sebagai checkbox/card, contoh: "Pasangan Bata Merah 1PC:4PP (per m²)".
3. Setelah dicentang, muncul input volume untuk item tersebut (misal user isi "80 m²").
4. Item yang sudah dipilih masuk ke "Keranjang RAB" (sticky di bagian bawah/samping, terlihat jelas di mobile sebagai bottom sheet).
5. Total dihitung real-time setiap ada perubahan volume/item.

**Formula per item:**
```
hargaSatuanItem = Σ(koefisien_komponen × hargaTerkiniKomponen)   // dihitung server-side
subtotalItem = hargaSatuanItem × volumeInput
totalRAB = Σ subtotalItem + (Σ subtotalItem × overheadProfitPersen)
```

**Output akhir Mode 2:**
- Tabel rekapitulasi detail (mirip format RAB profesional): No | Uraian Pekerjaan | Volume | Satuan | Harga Satuan | Jumlah.
- Subtotal per kategori pekerjaan + grand total.
- **Tombol "Unduh sebagai PDF"** — generate dokumen RAB rapi dengan kop/logo perusahaan (pakai library PDF generation, lihat bagian 7).
- **Tombol "Kirim ke WhatsApp Admin"** — kirim ringkasan hasil kalkulasi otomatis ke nomor WA bisnis (format teks terstruktur) sebagai trigger follow-up sales.
- Opsi "Simpan & lanjutkan nanti" — hasil kalkulasi disimpan dengan link unik (`/rab/hasil/[uniqueId]`) yang bisa dibuka lagi oleh user tanpa perlu akun.

---

## 6. VALIDASI & KEAMANAN DATA HARGA

- **Semua kalkulasi HARUS dihitung ulang di server** (Astro API route), tidak boleh hanya mengandalkan angka dari client — supaya harga tidak bisa dimanipulasi lewat devtools/network tampering.
- Endpoint API:
  - `POST /api/rab/quick-estimate` → terima `{jenisPekerjaan, luas, kualitas, jumlahLantai}` → return `{rangeBawah, rangeAtas, breakdown}`.
  - `POST /api/rab/detail-calculate` → terima array `{ahspItemId, volume}[]` → ambil harga terbaru dari CMS/cache → return breakdown lengkap + `totalRAB`.
  - `POST /api/rab/save` → simpan hasil kalkulasi ke database (Supabase), return `uniqueId` untuk link share.
  - `GET /api/rab/hasil/[uniqueId]` → ambil kembali hasil tersimpan.
- **Rate limiting** di semua endpoint RAB (misal max 20 request/menit per IP) untuk cegah abuse/spam server.
- **Cache harga bahan/upah** di edge (Vercel KV atau in-memory cache 5–10 menit) supaya tidak query CMS setiap kali user ubah volume — penting untuk performa Mode 2 yang real-time.
- Setiap hasil kalkulasi yang disimpan WAJIB menyertakan **snapshot harga saat itu** (bukan referensi live), supaya kalau harga di CMS berubah nanti, RAB lama yang sudah dikirim ke klien tidak ikut berubah retroaktif.

---

## 7. GENERATE PDF RAB (untuk konsumen)

- Gunakan library yang jalan baik di serverless Vercel, misal `@react-pdf/renderer` atau `pdf-lib` (hindari Puppeteer di serverless karena berat & sering timeout di free tier Vercel).
- Template PDF wajib memuat: Logo & nama perusahaan, tanggal, nama klien (jika diisi), tabel rincian pekerjaan, total, disclaimer estimasi, kontak perusahaan.
- PDF di-generate di API route (`/api/rab/generate-pdf`), dikirim sebagai file download langsung ke browser.

---

## 8. UX MOBILE-FIRST KHUSUS KALKULATOR

- Mode 1: semua step wizard full-screen per langkah di mobile (tidak scroll form panjang), progress indicator di atas (misal "Langkah 2 dari 4").
- Mode 2: "Keranjang RAB" jadi **bottom sheet** yang bisa di-swipe-up di mobile (bukan sidebar seperti di desktop), dengan tombol total mengambang (sticky) selalu terlihat: `Total: Rp xxx | Lihat Detail`.
- Semua angka besar pakai format Rupiah otomatis (mis. `1.150.000.000` bukan `1150000000`), gunakan `Intl.NumberFormat('id-ID')`.
- Input angka di mobile wajib `inputmode="numeric"` agar keyboard yang muncul angka, bukan keyboard huruf.
- Test khusus: pastikan bottom sheet keranjang RAB tidak menutupi tombol CTA penting & tidak menyebabkan double-scroll (scroll di dalam sheet vs scroll halaman).

---

## 9. INTEGRASI LEAD & FOLLOW UP

- Setiap kali user menyelesaikan Mode 1 atau Mode 2 dan submit kontak, simpan ke tabel Supabase `rab_leads`:
  ```
  rab_leads {
    id, nama, whatsapp, email, hasilKalkulasiId,
    sumberMode: "quick" | "detail",
    createdAt
  }
  ```
- Trigger notifikasi otomatis ke admin (via webhook ke WhatsApp Business API atau minimal email) setiap ada leads baru — supaya sales bisa follow up cepat selagi calon klien masih hangat.

---

## 10. CHECKLIST PENERIMAAN FITUR RAB

- [ ] Perhitungan berbasis AHSP (koefisien × harga terkini), bukan angka statis hardcode.
- [ ] Admin bisa update harga bahan/upah dari CMS dan hasil kalkulasi berubah otomatis tanpa deploy ulang.
- [ ] Mode 1 (cepat) tampil di homepage, selesai diisi dalam <1 menit di HP.
- [ ] Mode 2 (detail) tersedia di halaman khusus, dengan keranjang RAB yang real-time dan bisa export PDF.
- [ ] Semua kalkulasi divalidasi ulang di server, tidak bisa dimanipulasi dari client.
- [ ] Hasil kalkulasi tersimpan dengan snapshot harga (tidak berubah retroaktif jika harga CMS diupdate nanti).
- [ ] Ada rate limiting di API RAB.
- [ ] PDF hasil RAB bisa diunduh dengan tampilan profesional (logo, kop, rincian, disclaimer).
- [ ] Leads dari kalkulator otomatis masuk ke database & memicu notifikasi ke admin.
- [ ] UX mobile: step wizard (Mode 1) dan bottom sheet keranjang (Mode 2) berjalan mulus tanpa elemen tumpang tindih.
