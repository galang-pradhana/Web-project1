import { config, fields, collection, singleton } from '@keystatic/core';

// Mode storage berdasarkan environment:
// - 'cloud' saat di production (Vercel) → klien login via Keystatic Cloud
// - 'local' saat di development lokal → edit langsung tanpa login
const isProd = process.env.NODE_ENV === 'production';

export default config({
  storage: isProd
    ? {
        kind: 'cloud',
      }
    : {
        kind: 'local',
      },
  cloud: {
    project: 'creativa-studio/web-kontraktor',
  },
  ui: {
    brand: { name: 'CMS PT. DJC kontraktor' },
    navigation: {
      'Proyek & Layanan': ['projects', 'services'],
      'Halaman Website': ['homePage', 'tentangKami', 'timKami'],
      'Manajemen RAB': ['hargaBahan', 'hargaUpah', 'ahspItem', 'rabPaket'],
      'Konten & Edukasi': ['edukasiPosts'],
      'Pengaturan': ['siteSettings'],
    },
  },
  collections: {
    edukasiPosts: collection({
      label: 'Konten Edukasi & Lainnya',
      slugField: 'imageUrl',
      path: 'src/content/edukasiPosts/*',
      format: { data: 'json' },
      schema: {
        imageUrl: fields.slug({
          name: { label: 'URL Gambar / Thumbnail' },
        }),
        contentType: fields.select({
          label: 'Tipe Konten',
          options: [
            { label: 'TikTok (Video)', value: 'tiktok' },
            { label: 'Instagram (Foto)', value: 'instagram' },
            { label: 'Foto Dokumentasi', value: 'foto' },
            { label: 'Video Dokumentasi (Cloudinary/Direct)', value: 'video' },
          ],
          defaultValue: 'foto',
        }),
        gridFormat: fields.select({
          label: 'Ukuran / Orientasi Grid',
          description: 'Pilih rasio tampilan grid untuk konten ini.',
          options: [
            { label: 'Landscape (Lebar - 3:2)', value: 'landscape' },
            { label: 'Portrait (Tinggi - 3:4)', value: 'portrait' },
            { label: 'Square (Kotak - 1:1)', value: 'square' },
          ],
          defaultValue: 'square',
        }),
        mediaUrl: fields.text({
          label: 'Link Sumber (URL TikTok / Instagram / Video Cloudinary)',
          description: 'Opsional — Untuk TikTok/Instagram masukkan link postingan. Untuk Video Cloudinary masukkan link file .mp4. Biarkan kosong jika hanya foto.',
        }),
        publishedAt: fields.text({
          label: 'Tanggal Upload (format: YYYY-MM-DD)',
          defaultValue: new Date().toISOString().split('T')[0],
        }),
        seoPreset: fields.select({
          label: 'Preset SEO',
          description: 'Pilih tema konten — digunakan untuk SEO otomatis, tidak tampil di website.',
          options: [
            { label: 'Tips Renovasi Rumah', value: 'tips-renovasi' },
            { label: 'Proses Pembangunan', value: 'proses-bangun' },
            { label: 'Pilihan Material Bangunan', value: 'material-bangunan' },
            { label: 'Before & After Renovasi', value: 'before-after' },
            { label: 'Inspirasi Desain Interior', value: 'desain-interior' },
            { label: 'Dokumentasi Proyek', value: 'dokumentasi-proyek' },
            { label: 'Tips & Trik Konstruksi', value: 'tips-konstruksi' },
            { label: 'Inspirasi Hunian Impian', value: 'inspirasi-rumah' },
          ],
          defaultValue: 'dokumentasi-proyek',
        }),
        isPublished: fields.checkbox({
          label: 'Tampilkan di Website',
          defaultValue: true,
        }),
      },
    }),
    projects: collection({
      label: 'Proyek Portofolio',
      slugField: 'title',
      path: 'src/content/projects/*',
      entryLayout: 'form',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Judul Proyek' } }),
        category: fields.select({
          label: 'Kategori',
          options: [
            { label: 'Residential', value: 'residential' },
            { label: 'Komersial', value: 'komersial' },
            { label: 'Renovasi', value: 'renovasi' },
            { label: 'Interior', value: 'interior' },
          ],
          defaultValue: 'residential',
        }),
        coverImage: fields.text({
          label: 'URL Foto Cover (Statis atau path /images/projects/)',
          defaultValue: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        }),
        coverVideo: fields.text({
          label: 'URL Video Cover (Cloudinary MP4)',
        }),
        galleryItems: fields.array(
          fields.object({
            imageUrl: fields.text({ label: 'URL Foto Galeri' }),
            caption: fields.text({ label: 'Keterangan Gambar', multiline: true }),
          }),
          {
            label: 'Galeri Foto',
            itemLabel: (props) => props.fields.caption.value || props.fields.imageUrl.value || 'Tambah foto...',
          }
        ),
        videoGallery: fields.array(
          fields.text({
            label: 'URL Video Galeri',
          }),
          {
            label: 'Galeri Video',
            itemLabel: (props) => props.value || 'Video URL',
          }
        ),
        area: fields.number({ label: 'Luas Bangunan (m²)' }),
        location: fields.text({ label: 'Lokasi' }),
        client: fields.text({ label: 'Klien' }),
        year: fields.number({ label: 'Tahun Selesai' }),
        budgetRange: fields.text({ label: 'Range Budget (misal: Rp 1.5M - Rp 2M)' }),
        testimonialContent: fields.text({ label: 'Isi Testimoni Klien', multiline: true }),
        testimonialAuthor: fields.text({ label: 'Nama Pemberi Testimoni' }),
        description: fields.text({ label: 'Deskripsi Proyek', multiline: true }),
        isArchived: fields.checkbox({
          label: 'Arsipkan Proyek (Sembunyikan dari Website)',
          defaultValue: false,
        }),
        status: fields.select({
          label: 'Status Pengerjaan',
          options: [
            { label: 'Completed', value: 'completed' },
            { label: 'On Progress', value: 'on-progress' },
            { label: 'Planned / Upcoming', value: 'planned' }
          ],
          defaultValue: 'completed',
        }),
      },
    }),
    services: collection({
      label: 'Layanan',
      slugField: 'name',
      path: 'src/content/services/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Nama Layanan' } }),
        icon: fields.text({ label: 'Nama Ikon Lucide (contoh: Home, PenTool, Wrench)', defaultValue: 'Home' }),
        description: fields.text({ label: 'Deskripsi Layanan', multiline: true }),
        coverImage: fields.text({
          label: 'URL Foto Cover Layanan',
          defaultValue: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
        }),
      },
    }),
    hargaBahan: collection({
      label: 'Harga Bahan Material',
      slugField: 'nama',
      path: 'src/content/hargaBahan/*',
      format: { data: 'json' },
      schema: {
        nama: fields.slug({ name: { label: 'Nama Bahan' } }),
        satuan: fields.select({
          label: 'Satuan',
          options: [
            { label: 'kg', value: 'kg' },
            { label: 'm³', value: 'm3' },
            { label: 'm²', value: 'm2' },
            { label: 'buah', value: 'buah' },
            { label: 'batang', value: 'batang' },
            { label: 'sak', value: 'sak' },
            { label: 'liter', value: 'liter' },
            { label: 'm1 (meter lari)', value: 'm1' },
          ],
          defaultValue: 'buah',
        }),
        hargaSatuan: fields.number({ label: 'Harga Satuan (Rp)' }),
        kategori: fields.select({
          label: 'Kategori Material',
          options: [
            { label: 'Semen & Beton', value: 'Semen & Beton' },
            { label: 'Kayu & Besi', value: 'Kayu & Besi' },
            { label: 'Batu & Pasir', value: 'Batu & Pasir' },
            { label: 'Keramik & Lantai', value: 'Keramik' },
            { label: 'Cat & Finishing', value: 'Cat' },
            { label: 'Pipa & Sanitair', value: 'Pipa & Sanitair' },
            { label: 'Kelistrikan', value: 'Kelistrikan' },
            { label: 'Atap', value: 'Atap' },
            { label: 'Lainnya', value: 'Lainnya' },
          ],
          defaultValue: 'Lainnya',
        }),
      },
    }),
    hargaUpah: collection({
      label: 'Harga Upah Tenaga Kerja',
      slugField: 'jenisPekerja',
      path: 'src/content/hargaUpah/*',
      format: { data: 'json' },
      schema: {
        jenisPekerja: fields.slug({ name: { label: 'Jenis Pekerja' } }),
        satuan: fields.text({ label: 'Satuan (misal: OH)', defaultValue: 'OH' }),
        hargaSatuan: fields.number({ label: 'Tarif Harian (Rp)' }),
      },
    }),
    ahspItem: collection({
      label: 'Analisa Harga Satuan Pekerjaan (AHSP)',
      slugField: 'namaPekerjaan',
      path: 'src/content/ahspItem/*',
      format: { data: 'json' },
      schema: {
        namaPekerjaan: fields.slug({ name: { label: 'Nama Item Pekerjaan' } }),
        kodeAHSP: fields.text({ label: 'Kode SNI/AHSP (misal: A.4.1.1.1)' }),
        kategoriPekerjaan: fields.select({
          label: 'Kategori Pekerjaan',
          options: [
            { label: 'Pekerjaan Persiapan', value: 'Pekerjaan Persiapan' },
            { label: 'Pekerjaan Tanah', value: 'Pekerjaan Tanah' },
            { label: 'Pekerjaan Pondasi', value: 'Pekerjaan Pondasi' },
            { label: 'Pekerjaan Struktur (Beton/Kolom/Balok)', value: 'Pekerjaan Struktur' },
            { label: 'Pekerjaan Dinding & Pasangan', value: 'Pekerjaan Dinding' },
            { label: 'Pekerjaan Atap & Plafon', value: 'Pekerjaan Atap' },
            { label: 'Pekerjaan Lantai', value: 'Pekerjaan Lantai' },
            { label: 'Pekerjaan Pintu & Jendela', value: 'Pekerjaan Pintu & Jendela' },
            { label: 'Pekerjaan Sanitair', value: 'Pekerjaan Sanitair' },
            { label: 'Pekerjaan Listrik', value: 'Pekerjaan Listrik' },
            { label: 'Pekerjaan Finishing & Cat', value: 'Pekerjaan Finishing/Cat' },
            { label: 'Pekerjaan Lainnya', value: 'Pekerjaan Lainnya' },
          ],
          defaultValue: 'Pekerjaan Struktur',
        }),
        satuanVolume: fields.select({
          label: 'Satuan Volume Pekerjaan',
          options: [
            { label: 'm³', value: 'm3' },
            { label: 'm²', value: 'm2' },
            { label: 'm1 (meter lari)', value: 'm1' },
            { label: 'unit', value: 'unit' },
            { label: 'titik', value: 'titik' },
            { label: 'ls (lump sum)', value: 'ls' },
          ],
          defaultValue: 'm2',
        }),
        bahanKomponen: fields.array(
          fields.object({
            bahanRef: fields.relationship({
              label: 'Pilih Bahan',
              collection: 'hargaBahan',
            }),
            koefisien: fields.number({ label: 'Koefisien Bahan' }),
          }),
          {
            label: 'Komponen Bahan',
            itemLabel: (props) => `${props.fields.bahanRef.value || 'Pilih Bahan'} - Koef: ${props.fields.koefisien.value || 0}`,
          }
        ),
        upahKomponen: fields.array(
          fields.object({
            upahRef: fields.relationship({
              label: 'Pilih Upah Tenaga Kerja',
              collection: 'hargaUpah',
            }),
            koefisien: fields.number({ label: 'Koefisien Upah' }),
          }),
          {
            label: 'Komponen Upah',
            itemLabel: (props) => `${props.fields.upahRef.value || 'Pilih Pekerja'} - Koef: ${props.fields.koefisien.value || 0}`,
          }
        ),
      },
    }),
    rabPaket: collection({
      label: 'Paket Estimasi Cepat (RAB Paket)',
      slugField: 'namaPaket',
      path: 'src/content/rabPaket/*',
      format: { data: 'json' },
      schema: {
        namaPaket: fields.slug({ name: { label: 'Nama Paket (misal: Standar / Menengah / Premium)' } }),
        jenisPekerjaan: fields.select({
          label: 'Jenis Pekerjaan',
          options: [
            { label: 'Bangun Baru', value: 'Bangun Baru' },
            { label: 'Renovasi Total', value: 'Renovasi Total' },
            { label: 'Renovasi Sebagian', value: 'Renovasi Sebagian' },
            { label: 'Interior Saja', value: 'Interior Saja' },
          ],
          defaultValue: 'Bangun Baru',
        }),
        hargaPerM2: fields.number({ label: 'Harga Rata-Rata per m² (Rp)' }),
        persenStruktur: fields.number({ label: 'Persen Struktur (%)', defaultValue: 30 }),
        persenDinding: fields.number({ label: 'Persen Dinding & Lantai (%)', defaultValue: 25 }),
        persenAtap: fields.number({ label: 'Persen Atap & Plafon (%)', defaultValue: 15 }),
        persenFinishing: fields.number({ label: 'Persen Finishing & Pengecatan (%)', defaultValue: 15 }),
        persenMEP: fields.number({ label: 'Persen Mekanikal Elektrikal Plambing (%)', defaultValue: 10 }),
        persenLainnya: fields.number({ label: 'Persen Pekerjaan Lainnya (%)', defaultValue: 5 }),
        deskripsi: fields.text({ label: 'Deskripsi Singkat Paket', multiline: true }),
        contohMaterial: fields.array(fields.text({ label: 'Material' }), {
          label: 'Daftar Contoh Material',
          itemLabel: (props) => props.value || 'Nama Material',
        }),
      },
    }),
  },
  singletons: {
    timKami: singleton({
      label: 'Halaman Tim Kami',
      path: 'src/content/timKami',
      format: { data: 'json' },
      schema: {
        headerEyebrow: fields.text({ label: 'Eyebrow Header', defaultValue: 'STRUKTUR ORGANISASI' }),
        headerTitle: fields.text({ label: 'Judul Halaman', defaultValue: 'Keahlian Teknik & Visi Konstruksi' }),
        headerDescription: fields.text({ label: 'Deskripsi Header Halaman', multiline: true, defaultValue: 'Di balik setiap proyek yang kokoh dan estetis, terdapat dedikasi dari para profesional berpengalaman yang mengutamakan keselamatan kerja, keterbukaan biaya, dan presisi di lapangan.' }),
        members: fields.array(
          fields.object({
            id: fields.text({ label: 'ID Unik (contoh: muhammad-maulana, gunakan huruf kecil dan tanda hubung)' }),
            name: fields.text({ label: 'Nama Lengkap' }),
            role: fields.text({ label: 'Jabatan / Peran' }),
            image: fields.text({ label: 'Path Foto Profil (contoh: /images/team/Muhammad maulana - Founder.png atau URL luar)' }),
            description: fields.text({ label: 'Deskripsi Profil / Biografi', multiline: true }),
          }),
          {
            label: 'Daftar Anggota Tim',
            itemLabel: (props) => props.fields.name.value || 'Anggota Baru',
          }
        ),
      },
    }),
    tentangKami: singleton({
      label: 'Halaman Tentang Kami',
      path: 'src/content/tentangKami',
      format: { data: 'json' },
      schema: {
        headerEyebrow: fields.text({ label: 'Eyebrow Header (misal: PROFIL PERUSAHAAN)', defaultValue: 'PROFIL PERUSAHAAN' }),
        headerTitle: fields.text({ label: 'Judul Halaman (misal: PRESISI & ESTETIKA)', defaultValue: 'PRESISI & ESTETIKA' }),
        headerDescription: fields.text({ label: 'Deskripsi Header Halaman', multiline: true }),

        visiTitle: fields.text({ label: 'Judul Bagian Visi', defaultValue: 'VISI & DEDIKASI KAMI' }),
        visiImageUrl: fields.text({ label: 'URL Gambar Visi', defaultValue: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800' }),
        visiParagraph1: fields.text({ label: 'Paragraf Visi 1', multiline: true }),
        visiParagraph2: fields.text({ label: 'Paragraf Visi 2', multiline: true }),
        visiParagraph3: fields.text({ label: 'Paragraf Visi 3', multiline: true }),

        statTahunBerdiri: fields.text({ label: 'Statistik: Tahun Berdiri', defaultValue: '2012' }),
        statProyekSelesai: fields.text({ label: 'Statistik: Jumlah Proyek Selesai', defaultValue: '100+' }),
        statKotaOperasional: fields.text({ label: 'Statistik: Jumlah Kota Operasional', defaultValue: '2+' }),

        k3ImageUrl: fields.text({ label: 'URL Gambar K3', defaultValue: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800' }),
        k3Description: fields.text({ label: 'Deskripsi Bagian K3', multiline: true }),
        k3Quote: fields.text({ label: 'Kutipan K3', multiline: true }),

        coverageEyebrow: fields.text({ label: 'Cakupan Layanan: Eyebrow', defaultValue: 'CAKUPAN LAYANAN' }),
        coverageTitle: fields.text({ label: 'Cakupan Layanan: Judul', defaultValue: 'TIPE PROYEK YANG KAMI KERJAKAN' }),
        coverageBuildingTypes: fields.array(fields.text({ label: 'Tipe Bangunan' }), {
          label: 'Daftar Tipe Bangunan',
          itemLabel: (props) => props.value || 'Tipe Bangunan Baru',
        }),
        coverageArchitecturalStyles: fields.array(fields.text({ label: 'Gaya Arsitektur' }), {
          label: 'Daftar Gaya Arsitektur',
          itemLabel: (props) => props.value || 'Gaya Arsitektur Baru',
        }),
      },
    }),
    siteSettings: singleton({
      label: 'Pengaturan Situs',
      path: 'src/content/siteSettings',
      format: { data: 'json' },
      schema: {
        brandName: fields.text({ label: 'Nama Brand', defaultValue: 'Creativa Studio' }),
        description: fields.text({ label: 'Tagline & Deskripsi Singkat', multiline: true }),
        email: fields.text({ label: 'Email Kontak', defaultValue: 'info@creativastudio.com' }),
        whatsapp: fields.text({ label: 'Nomor WhatsApp (format: 628xxxx)', defaultValue: '628123456789' }),
        address: fields.text({ label: 'Alamat Kantor', multiline: true, defaultValue: 'Jl. Kayu Putih Raya No. 12, Kebayoran Baru, Jakarta Selatan' }),
        instagram: fields.text({ label: 'URL Instagram', defaultValue: 'https://instagram.com/creativastudio' }),
        showInstagram: fields.checkbox({ label: 'Tampilkan Instagram', defaultValue: true }),
        facebook: fields.text({ label: 'URL Facebook', defaultValue: 'https://facebook.com/djckontraktor' }),
        showFacebook: fields.checkbox({ label: 'Tampilkan Facebook', defaultValue: true }),
        tiktok: fields.text({ label: 'URL TikTok', defaultValue: 'https://tiktok.com/@djckontraktor' }),
        showTiktok: fields.checkbox({ label: 'Tampilkan TikTok', defaultValue: true }),
        mapsLink: fields.text({ label: 'Link Google Maps', defaultValue: 'https://maps.google.com' }),
        keywords: fields.text({ label: 'Kata Kunci SEO (pisahkan dengan koma)', defaultValue: 'kontraktor bogor, kontraktor tangerang, jasa bangun rumah bogor, jasa bangun rumah tangerang, kontraktor bangun ruko, jasa arsitek bogor, jasa arsitek tangerang, renovasi rumah tangerang, renovasi rumah bogor, kontraktor bangun gudang' }),
        googleSiteVerification: fields.text({
          label: 'Google Site Verification',
          description: 'Kode verifikasi Google Search Console (untuk metode HTML Tag, ambil isi dari attribute content saja)',
        }),
      },
    }),
    homePage: singleton({
      label: 'Halaman Utama',
      path: 'src/content/homePage',
      format: { data: 'json' },
      schema: {
        heroEyebrow: fields.text({ label: 'Hero Eyebrow', defaultValue: 'CREATIVA STUDIO — KONTRAKTOR & ARSITEKTUR' }),
        heroTitle: fields.text({ label: 'Hero Title', defaultValue: 'STRUKTUR PRESTISIUS, ARSITEKTUR & JASA KONTRAKTOR.' }),
        heroTagline: fields.text({ label: 'Hero Tagline', multiline: true, defaultValue: 'Kami merancang, merencana, dan membangun residensial serta komersial premium — menghadirkan integrasi arsitektur visioner dengan eksekusi kontraktor yang presisi.' }),
        heroImages: fields.array(
          fields.object({
            title: fields.text({ label: 'Judul Gambar' }),
            category: fields.text({ label: 'Kategori' }),
            imageUrl: fields.text({ label: 'URL Gambar' }),
          }),
          {
            label: 'Daftar Gambar Hero',
            itemLabel: (props) => props.fields.title.value || 'Gambar Hero',
          }
        ),
        
        philosophySubtitle: fields.text({ label: 'Filosofi Subtitle', defaultValue: 'FILOSOFI KAMI' }),
        philosophyTitle: fields.text({ label: 'Filosofi Title (gunakan <br/> untuk baris baru)', defaultValue: 'DESAIN VISIONER<br/>& EKSEKUSI PRESISI' }),
        philosophyDescription: fields.text({ label: 'Filosofi Deskripsi', multiline: true, defaultValue: 'Bagi kami, arsitektur adalah seni menyelaraskan ruang dengan alam and penghuninya. Kami merancang arsitektur tropis modern yang tidak hanya estetik, tetapi juga fungsional dan adaptif terhadap iklim lokal. Melalui perencanaan matang dan eksekusi yang presisi, kami menghadirkan hunian premium yang tak lekang oleh waktu.' }),
        
        coverageEyebrow: fields.text({ label: 'Cakupan Layanan Eyebrow', defaultValue: 'CAKUPAN LAYANAN' }),
        coverageTitle: fields.text({ label: 'Cakupan Layanan Title', defaultValue: 'SPESIALISASI & CAKUPAN' }),
        coverageDescription: fields.text({
          label: 'Cakupan Layanan Deskripsi',
          multiline: true,
          defaultValue: 'PT. DJC kontraktor menghadirkan layanan kontraktor dan perencanaan arsitektur profesional di wilayah Jabodetabek. Kami memadukan standar konstruksi bersertifikasi dengan efisiensi biaya melalui estimasi RAB yang transparan untuk hunian tinggal, bangunan komersial, ruko, hingga pergudangan.'
        }),
        coverageTags: fields.array(
          fields.text({ label: 'Tag / Keyword' }),
          {
            label: 'Daftar Tag / Keyword SEO',
            itemLabel: (props) => props.value || 'Tag / Keyword',
          }
        ),

        faqs: fields.array(
          fields.object({
            question: fields.text({ label: 'Pertanyaan' }),
            answer: fields.text({ label: 'Jawaban', multiline: true }),
          }),
          {
            label: 'Daftar Pertanyaan Umum (FAQ)',
            itemLabel: (props) => props.fields.question.value || 'Pertanyaan',
          }
        ),
      },
    }),
  },
});
