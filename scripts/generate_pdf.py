import os
import base64
from playwright.sync_api import sync_playwright

def generate_pdf():
    project_dir = '/media/galangpradhana/DATA/galang/Projek Web/web-kontraktor'
    doc_dir = os.path.join(project_dir, 'docs')
    img_dir = os.path.join(doc_dir, 'cms_screenshots')
    pdf_out = os.path.join(doc_dir, 'Panduan_Penggunaan_CMS_PT_DJC_Kontraktor.pdf')

    def get_base64_img(filename):
        path = os.path.join(img_dir, filename)
        if os.path.exists(path):
            with open(path, 'rb') as f:
                encoded = base64.b64encode(f.read()).decode('utf-8')
                return f"data:image/png;base64,{encoded}"
        return ''

    imgs = {
        'dashboard': get_base64_img('01_dashboard.png'),
        'proyek_list': get_base64_img('02_proyek_list.png'),
        'layanan_list': get_base64_img('03_layanan_list.png'),
        'harga_bahan': get_base64_img('04_harga_bahan_list.png'),
        'harga_upah': get_base64_img('05_harga_upah_list.png'),
        'ahsp': get_base64_img('06_ahsp_list.png'),
        'rab_paket': get_base64_img('07_rab_paket_list.png'),
        'edukasi': get_base64_img('08_edukasi_list.png'),
        'home': get_base64_img('09_home_settings.png'),
        'tentang': get_base64_img('10_tentang_kami.png'),
        'tim': get_base64_img('11_tim_kami.png'),
        'site': get_base64_img('12_site_settings.png'),
    }

    html_content = f"""<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Panduan Penggunaan CMS - PT. DJC Kontraktor</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  
  @page {{
    size: A4;
    margin: 18mm 16mm 20mm 16mm;
  }}

  body {{
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #1e293b;
    line-height: 1.6;
    font-size: 12.5px;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
  }}

  /* Cover Page */
  .cover-page {{
    page-break-after: always;
    min-height: 900px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 40px 30px;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #ffffff;
    border-radius: 12px;
  }}

  .cover-header {{
    border-bottom: 2px solid #3b82f6;
    padding-bottom: 20px;
  }}

  .cover-badge {{
    display: inline-block;
    background: rgba(59, 130, 246, 0.2);
    color: #60a5fa;
    border: 1px solid #3b82f6;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 15px;
  }}

  .cover-title {{
    font-size: 30px;
    font-weight: 800;
    line-height: 1.25;
    margin: 0 0 10px 0;
    color: #ffffff;
  }}

  .cover-subtitle {{
    font-size: 16px;
    color: #94a3b8;
    font-weight: 500;
    margin: 0;
  }}

  .cover-body {{
    margin: 30px 0;
  }}

  .cover-img-box {{
    border: 3px solid #334155;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  }}

  .cover-img-box img {{
    width: 100%;
    display: block;
  }}

  .cover-footer {{
    border-top: 1px solid #334155;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #94a3b8;
    font-size: 11.5px;
  }}

  /* Headings & Typography */
  h1 {{
    font-size: 20px;
    font-weight: 800;
    color: #0f172a;
    border-bottom: 2px solid #2563eb;
    padding-bottom: 6px;
    margin-top: 30px;
    margin-bottom: 16px;
    page-break-after: avoid;
  }}

  h2 {{
    font-size: 15px;
    font-weight: 700;
    color: #1e3a8a;
    margin-top: 22px;
    margin-bottom: 10px;
    page-break-after: avoid;
  }}

  h3 {{
    font-size: 13.5px;
    font-weight: 700;
    color: #334155;
    margin-top: 16px;
    margin-bottom: 8px;
    page-break-after: avoid;
  }}

  p {{
    margin: 0 0 10px 0;
  }}

  ul, ol {{
    margin: 0 0 12px 0;
    padding-left: 20px;
  }}

  li {{
    margin-bottom: 5px;
  }}

  .chapter {{
    page-break-before: always;
    padding-top: 10px;
  }}

  .chapter:first-of-type {{
    page-break-before: avoid;
  }}

  /* Content Boxes & Callouts */
  .callout {{
    background-color: #f0f9ff;
    border-left: 4px solid #0284c7;
    padding: 12px 16px;
    border-radius: 0 8px 8px 0;
    margin: 14px 0;
    font-size: 12px;
    page-break-inside: avoid;
  }}

  .callout-warning {{
    background-color: #fffbebfb;
    border-left: 4px solid #d97706;
    color: #78350f;
  }}

  .callout-success {{
    background-color: #f0fdf4;
    border-left: 4px solid #16a34a;
    color: #14532d;
  }}

  /* Image Screenshots */
  .screenshot-card {{
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 8px;
    margin: 16px 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    page-break-inside: avoid;
  }}

  .screenshot-card img {{
    width: 100%;
    border-radius: 4px;
    display: block;
    border: 1px solid #e2e8f0;
  }}

  .screenshot-caption {{
    text-align: center;
    font-size: 11px;
    color: #64748b;
    font-weight: 600;
    margin-top: 6px;
  }}

  /* Table styling */
  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 11.5px;
    page-break-inside: avoid;
  }}

  th {{
    background-color: #1e293b;
    color: #ffffff;
    padding: 8px 10px;
    text-align: left;
    font-weight: 600;
  }}

  td {{
    padding: 8px 10px;
    border-bottom: 1px solid #e2e8f0;
  }}

  tr:nth-child(even) {{
    background-color: #f8fafc;
  }}

  .toc-item {{
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px dashed #cbd5e1;
    font-size: 12.5px;
  }}

  .toc-title {{
    font-weight: 600;
    color: #1e293b;
  }}

  .badge {{
    background: #e0f2fe;
    color: #0369a1;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 10.5px;
    font-weight: 700;
  }}
</style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-header">
      <span class="cover-badge">Panduan Resmi CMS</span>
      <h1 class="cover-title">BUKU PANDUAN PENGGUNAAN CMS</h1>
      <div class="cover-subtitle">Pengelolaan Konten Website PT. DJC Kontraktor / Creativa Studio</div>
    </div>
    
    <div class="cover-body">
      <div class="cover-img-box">
        <img src="{imgs['dashboard']}" alt="Dashboard CMS">
      </div>
    </div>

    <div class="cover-footer">
      <div><strong>Disusun Oleh:</strong> Tim Pengembang Web</div>
      <div><strong>Target Pengguna:</strong> Pemilik Usaha, Admin & Marketing</div>
      <div><strong>Tahun:</strong> 2026</div>
    </div>
  </div>

  <!-- DAFTAR ISI -->
  <div style="padding-top: 10px;">
    <h1>DAFTAR ISI & STRUKTUR PANDUAN</h1>
    <p>Buku panduan ini disusun langkah demi langkah dengan bahasa non-teknis agar mudah dipahami oleh staf atau pemilik usaha tanpa latar belakang pemrograman.</p>
    
    <div style="margin-top: 15px;">
      <div class="toc-item">
        <span class="toc-title">BAB 1: Pengenalan & Cara Akses CMS</span>
        <span class="badge">Akses & Login</span>
      </div>
      <div class="toc-item">
        <span class="toc-title">BAB 2: Mengelola Proyek Portofolio & Layanan Usaha</span>
        <span class="badge">Portofolio</span>
      </div>
      <div class="toc-item">
        <span class="toc-title">BAB 3: Mengelola Halaman Utama, Profil & Tim Perusahaan</span>
        <span class="badge">Konten Web</span>
      </div>
      <div class="toc-item">
        <span class="toc-title">BAB 4: Manajemen Database RAB & Kalkulator Biaya</span>
        <span class="badge">Estimasi RAB</span>
      </div>
      <div class="toc-item">
        <span class="toc-title">BAB 5: Mengelola Konten Edukasi & Dokumentasi Lapangan</span>
        <span class="badge">Media & Sosmed</span>
      </div>
      <div class="toc-item">
        <span class="toc-title">BAB 6: Pengaturan Kontak, WhatsApp, Sosmed & SEO</span>
        <span class="badge">Site Settings</span>
      </div>
      <div class="toc-item">
        <span class="toc-title">BAB 7: Panduan Praktis & Tanya Jawab (FAQ)</span>
        <span class="badge">Tips & Solusi</span>
      </div>
    </div>
  </div>

  <!-- BAB 1 -->
  <div class="chapter">
    <h1>BAB 1: PENGENALAN & CARA AKSES CMS</h1>
    
    <h2>1.1 Apa itu CMS Keystatic?</h2>
    <p>CMS (<em>Content Management System</em>) adalah panel pengelolaan khusus yang digunakan untuk mengubah isi website Anda—seperti foto proyek, daftar layanan, harga bahan bangunan, nomor WhatsApp, hingga artikel—secara mandiri tanpa perlu memahami koding komputer.</p>

    <h2>1.2 Cara Membuka Dashboard CMS</h2>
    <p>Website Anda memiliki 2 mode akses bergantung pada lokasi pengoperasiannya:</p>
    <ul>
      <li><strong>Website Online (Produksi / Live):</strong> Buka browser Anda (Google Chrome / Safari) lalu ketik <code>https://domainanda.com/keystatic</code>. Anda akan diminta login menggunakan akun terdaftar.</li>
      <li><strong>Website Lokal (Komputer Pengembang):</strong> Buka <code>http://localhost:4321/keystatic</code> di komputer lokal untuk akses langsung tanpa login.</li>
    </ul>

    <h2>1.3 Memahami Tampilan Utama Dashboard</h2>
    <p>Berikut adalah tampilan halaman utama Dashboard CMS Keystatic setelah Anda berhasil masuk:</p>

    <div class="screenshot-card">
      <img src="{imgs['dashboard']}" alt="Dashboard Keystatic">
      <div class="screenshot-caption">Gambar 1.1 — Tampilan Utama Dashboard CMS Keystatic</div>
    </div>

    <div class="callout callout-success">
      <strong>Tips Navigasi:</strong> Di panel sebelah kiri layar terdapat 5 kelompok menu utama: <em>Proyek & Layanan</em>, <em>Halaman Website</em>, <em>Manajemen RAB</em>, <em>Konten & Edukasi</em>, dan <em>Pengaturan</em>.
    </div>

    <h2>1.4 Menyimpan Perubahan (Save & Publish)</h2>
    <p>Setiap kali selesai mengubah atau menambahkan data di form, klik tombol biru <strong>Save</strong> atau <strong>Save Changes</strong>. Sistem akan secara otomatis menyimpan data dan memperbarui tampilan website Anda.</p>
  </div>

  <!-- BAB 2 -->
  <div class="chapter">
    <h1>BAB 2: MENGELOLA PROYEK PORTOFOLIO & LAYANAN USAHA</h1>
    
    <h2>2.1 Menambah & Mengedit Proyek Portofolio</h2>
    <p>Portofolio merupakan galeri hasil pembangunan atau renovasi rumah/bangunan yang digunakan untuk membangun kepercayaan calon klien.</p>

    <div class="screenshot-card">
      <img src="{imgs['proyek_list']}" alt="Daftar Proyek">
      <div class="screenshot-caption">Gambar 2.1 — Halaman Kelola Daftar Proyek Portofolio</div>
    </div>

    <h3>Langkah-langkah Mengedit / Menambah Proyek:</h3>
    <ol>
      <li>Pilih menu <strong>Proyek Portofolio</strong> di navigasi kiri.</li>
      <li>Klik tombol <strong>Add</strong> di pojok kanan atas untuk menambah proyek baru, atau klik nama proyek yang sudah ada untuk mengeditnya.</li>
      <li>Isikan kolom form berikut:
        <ul>
          <li><strong>Judul Proyek:</strong> Nama proyek (contoh: <em>Residensial Minimalis Kayu Putih</em>).</li>
          <li><strong>Kategori:</strong> Pilih antara <code>Residential</code>, <code>Komersial</code>, <code>Renovasi</code>, atau <code>Interior</code>.</li>
          <li><strong>Foto Cover & Video:</strong> URL gambar atau file video pengenal proyek.</li>
          <li><strong>Galeri Foto:</strong> Klik <em>Add</em> untuk menambahkan foto-foto pendukung proyek beserta keterangan (caption).</li>
          <li><strong>Detail Spesifikasi:</strong> Luas bangunan (m²), Lokasi, Nama Klien, Tahun Selesai, dan Range Budget.</li>
          <li><strong>Testimoni Klien:</strong> Isi testimoni dan nama pemberi ulasan.</li>
          <li><strong>Status:</strong> Pilih <code>Completed</code>, <code>On Progress</code>, atau <code>Planned</code>.</li>
        </ul>
      </li>
      <li>Klik <strong>Save</strong>.</li>
    </ol>

    <h2>2.2 Cara Mengarsipkan Proyek</h2>
    <p>Jika ada proyek yang ingin disembunyikan sementara waktu dari website tanpa menghapus datanya, centang opsi <strong>Arsipkan Proyek (Sembunyikan dari Website)</strong> lalu simpan.</p>

    <h2>2.3 Mengedit Daftar Layanan Usaha</h2>
    <div class="screenshot-card">
      <img src="{imgs['layanan_list']}" alt="Daftar Layanan">
      <div class="screenshot-caption">Gambar 2.2 — Halaman Kelola Layanan Usaha</div>
    </div>
    <p>Gunakan menu ini untuk mengubah deskripsi layanan yang Anda tawarkan, foto banner layanan, dan nama ikon Lucide (seperti <code>Home</code>, <code>PenTool</code>, atau <code>Wrench</code>).</p>
  </div>

  <!-- BAB 3 -->
  <div class="chapter">
    <h1>BAB 3: MENGELOLA HALAMAN UTAMA, PROFIL & TIM</h1>

    <h2>3.1 Pengaturan Halaman Utama (Beranda)</h2>
    <div class="screenshot-card">
      <img src="{imgs['home']}" alt="Halaman Utama">
      <div class="screenshot-caption">Gambar 3.1 — Form Pengaturan Halaman Utama (Home)</div>
    </div>
    <p>Di halaman ini Anda dapat menyesuaikan ucapan selamat datang (Hero Section), gambar slide besar carousel, deskripsi filosofi arsitektur perusahaan, serta daftar Pertanyaan Umum (FAQ).</p>

    <h2>3.2 Pengaturan Halaman Tentang Kami (Profil Perusahaan)</h2>
    <div class="screenshot-card">
      <img src="{imgs['tentang']}" alt="Tentang Kami">
      <div class="screenshot-caption">Gambar 3.2 — Form Pengaturan Halaman Tentang Kami</div>
    </div>
    <p>Gunakan halaman ini untuk mengubah visi-misi perusahaan, statistik proyek selesai (seperti <em>100+ Proyek</em>), penjelasan standar keselamatan kerja K3, serta cakupan tipe bangunan dan gaya arsitektur.</p>

    <h2>3.3 Memperbarui Anggota Tim Perusahaan</h2>
    <div class="screenshot-card">
      <img src="{imgs['tim']}" alt="Tim Kami">
      <div class="screenshot-caption">Gambar 3.3 — Halaman Pengaturan Jajaran Tim Perusahaan</div>
    </div>
    <p>Anda dapat menambah atau mengedit jajaran direksi, arsitek, dan manajer proyek. Isikan Nama Lengkap, Jabatan/Peran, Path Foto Profil, serta deskripsi singkat biografi.</p>
  </div>

  <!-- BAB 4 -->
  <div class="chapter">
    <h1>BAB 4: MANAJEMEN DATABASE RAB & KALKULATOR ESTIMASI BIAYA</h1>
    <p>Website ini dilengkapi dengan sistem kalkulator estimasi biaya otomatis. Anda dapat menjaga keakuratan kalkulator dengan rutin mengupdate standar harga di bawah ini:</p>

    <h2>4.1 Update Harga Bahan Material</h2>
    <div class="screenshot-card">
      <img src="{imgs['harga_bahan']}" alt="Harga Bahan">
      <div class="screenshot-caption">Gambar 4.1 — Database Harga Bahan Material Bangunan</div>
    </div>
    <p>Ubah harga semen, batu, besi, cat, dan keramik. Tentukan satuan yang sesuai (seperti <em>kg, m³, m², sak, buah, batang, liter</em>) dan kategori materialnya.</p>

    <h2>4.2 Update Tarif Upah Harian Pekerja</h2>
    <div class="screenshot-card">
      <img src="{imgs['harga_upah']}" alt="Harga Upah">
      <div class="screenshot-caption">Gambar 4.2 — Database Tarif Upah Harian Tukang / Worker</div>
    </div>
    <p>Update tarif harian per Orang Hari (OH) untuk Mandor, Tukang Batu, Tukang Kayu, maupun Pekerja Laden.</p>

    <h2>4.3 AHSP & Paket Estimasi Cepat</h2>
    <div style="display: flex; gap: 10px;">
      <div class="screenshot-card" style="flex: 1;">
        <img src="{imgs['ahsp']}" alt="AHSP">
        <div class="screenshot-caption">Gambar 4.3 — Analisa AHSP</div>
      </div>
      <div class="screenshot-card" style="flex: 1;">
        <img src="{imgs['rab_paket']}" alt="RAB Paket">
        <div class="screenshot-caption">Gambar 4.4 — Paket Estimasi Biaya</div>
      </div>
    </div>
    <p>Atur porsi persentase alokasi biaya (Struktur, Dinding, Atap, Finishing, MEP) serta paket biaya per m² (Standar, Menengah, Premium).</p>
  </div>

  <!-- BAB 5 & 6 -->
  <div class="chapter">
    <h1>BAB 5 & 6: MEDIA, KONTAK, WHATSAPP & SEO</h1>

    <h2>5.1 Konten Edukasi & Dokumentasi Proyek</h2>
    <div class="screenshot-card">
      <img src="{imgs['edukasi']}" alt="Edukasi & Media">
      <div class="screenshot-caption">Gambar 5.1 — Halaman Pengelolaan Konten Dokumentasi & Edukasi</div>
    </div>
    <p>Publikasikan foto/video lapangan terbaru, tautkan postingan TikTok/Instagram, dan atur orientasi grid tampilan (Landscape, Portrait, Square).</p>

    <h2>6.1 Pengaturan Situs, Kontak & WhatsApp</h2>
    <div class="screenshot-card">
      <img src="{imgs['site']}" alt="Site Settings">
      <div class="screenshot-caption">Gambar 6.1 — Pengaturan Kontak, Sosmed & SEO Website</div>
    </div>

    <div class="callout callout-warning">
      <strong>⚠️ ATURAN FORMAT NOMOR WHATSAPP (SANGAT PENTING):</strong><br>
      Gunakan kode negara <code>62</code> tanpa angka 0 di depan, tanpa spasi, tanpa strip (-), dan tanpa tanda plus (+).<br>
      • ❌ Salah: <code>0812-3456-7890</code> atau <code>+62 812 3456 7890</code><br>
      • ✅ Benar: <code>6281234567890</code>
    </div>

    <h2>6.2 Kata Kunci SEO Pencarian Google</h2>
    <p>Isikan kata kunci pencarian yang relevan pada kolom <em>Kata Kunci SEO</em> dipisahkan dengan tanda koma (contoh: <code>kontraktor bogor, jasa bangun rumah tangerang, renovasi rumah jakarta</code>).</p>
  </div>

  <!-- BAB 7 -->
  <div class="chapter">
    <h1>BAB 7: TANYA JAWAB & PETUNJUK PRAKTIS (FAQ)</h1>
    
    <table>
      <thead>
        <tr>
          <th style="width: 35%;">Pertanyaan</th>
          <th>Penjelasan & Solusi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Mengapa perubahan belum langsung muncul di website live?</strong></td>
          <td>Setelah menekan <em>Save</em>, server memerlukan waktu 1–2 menit untuk memperbarui file secara otomatis. Silakan refresh halaman browser Anda setelah 2 menit.</td>
        </tr>
        <tr>
          <td><strong>Berapa ukuran gambar yang disarankan?</strong></td>
          <td>Gunakan format JPG/PNG dengan lebar minimal 1200px untuk foto cover/banner. Kompres foto Anda terlebih dahulu di situs <em>tinypng.com</em> agar website dimuat sangat cepat.</td>
        </tr>
        <tr>
          <td><strong>Bagaimana jika salah menginput data?</strong></td>
          <td>Cukup buka kembali data tersebut, perbaiki isian form, lalu klik tombol <em>Save</em> kembali. Jika belum disimpan, klik <em>Discard</em> atau tutup halaman.</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 50px; text-align: center; color: #64748b; font-size: 11px; border-top: 1px solid #cbd5e1; padding-top: 15px;">
      Dokumen Panduan Penggunaan CMS Keystatic — PT. DJC Kontraktor / Creativa Studio © 2026
    </div>
  </div>

</body>
</html>
"""

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_content(html_content, wait_until='networkidle')
        page.pdf(
            path=pdf_out,
            format='A4',
            print_background=True,
            display_header_footer=True,
            header_template='<div style="font-size: 9px; color: #94a3b8; width: 100%; text-align: right; padding-right: 16mm;">PANDUAN CMS — PT. DJC KONTRAKTOR</div>',
            footer_template='<div style="font-size: 9px; color: #94a3b8; width: 100%; text-align: center;">Halaman <span class="pageNumber"></span> dari <span class="totalPages"></span></div>',
            margin={
                'top': '18mm',
                'bottom': '20mm',
                'left': '16mm',
                'right': '16mm'
            }
        )
        browser.close()

    print(f"SUCCESS: PDF created at {pdf_out}")

if __name__ == '__main__':
    generate_pdf()
