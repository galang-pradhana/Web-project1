import React, { useState } from 'react';
import { 
  Home, 
  Wrench, 
  Layers, 
  Paintbrush, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Minus, 
  ArrowRight,
  Info,
  PhoneCall
} from 'lucide-react';
import { formatRupiah } from '../utils/rab-formula';

interface Package {
  slug: string;
  namaPaket: string;
  jenisPekerjaan: string;
  hargaPerM2: number;
  persenStruktur: number;
  persenDinding: number;
  persenAtap: number;
  persenFinishing: number;
  persenMEP: number;
  persenLainnya: number;
  deskripsi: string;
  contohMaterial: string[];
}

interface QuickEstimatorProps {
  packages: Package[];
  whatsappNumber: string;
  onSwitchToDetail?: () => void;
}

type JobType = 'Bangun Baru' | 'Renovasi Total' | 'Renovasi Sebagian' | 'Interior Saja';

export const QuickEstimator: React.FC<QuickEstimatorProps> = ({ packages, whatsappNumber, onSwitchToDetail }) => {
  const [step, setStep] = useState<number>(1);
  const [jobType, setJobType] = useState<JobType>('Bangun Baru');
  const [area, setArea] = useState<number>(100);
  const [selectedPkgSlug, setSelectedPkgSlug] = useState<string>(packages[0]?.slug || 'paket-standar');
  const [floors, setFloors] = useState<number>(1);

  // Form lead
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');


  // Pekerjaan multiplier
  const jobMultipliers: Record<JobType, number> = {
    'Bangun Baru': 1.0,
    'Renovasi Total': 0.85,
    'Renovasi Sebagian': 0.6,
    'Interior Saja': 0.4,
  };

  const jobMultiplier = jobMultipliers[jobType];
  const activePkg = packages.find((p) => p.slug === selectedPkgSlug) || packages[0];

  if (!activePkg) {
    return (
      <div className="text-stone-800 p-6 border border-red-200 bg-red-50/50 rounded-xl font-sans text-sm flex items-center gap-3">
        <Info className="w-5 h-5 text-red-500 shrink-0" />
        <span>Data paket estimasi tidak ditemukan. Silakan konfigurasi paket di CMS Keystatic terlebih dahulu.</span>
      </div>
    );
  }

  // Hitung Estimasi
  const baseCost = area * activePkg.hargaPerM2 * jobMultiplier;
  const floorFactor = 1 + (0.12 * (floors - 1));
  const totalCost = baseCost * floorFactor;

  // Range harga dengan toleransi 15%
  const lowerRange = totalCost * 0.85;
  const upperRange = totalCost * 1.15;

  // Breakdown pembagian anggaran
  const costBreakdown = [
    { name: 'Pekerjaan Struktur', percentage: activePkg.persenStruktur ?? 0, cost: totalCost * ((activePkg.persenStruktur ?? 0) / 100), color: '#854d0e' }, // Warm timber
    { name: 'Pekerjaan Dinding & Lantai', percentage: activePkg.persenDinding ?? 0, cost: totalCost * ((activePkg.persenDinding ?? 0) / 100), color: '#a16207' },
    { name: 'Atap & Plafon', percentage: activePkg.persenAtap ?? 0, cost: totalCost * ((activePkg.persenAtap ?? 0) / 100), color: '#ca8a04' },
    { name: 'Finishing & Kusen', percentage: activePkg.persenFinishing ?? 0, cost: totalCost * ((activePkg.persenFinishing ?? 0) / 100), color: '#d97706' },
    { name: 'Mekanikal Elektrikal (MEP)', percentage: activePkg.persenMEP ?? 0, cost: totalCost * ((activePkg.persenMEP ?? 0) / 100), color: '#eab308' },
    { name: 'Lainnya / Persiapan', percentage: activePkg.persenLainnya ?? 0, cost: totalCost * ((activePkg.persenLainnya ?? 0) / 100), color: '#f59e0b' }
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setStep(5); // Masuk ke hasil kalkulasi
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      alert('Nama dan nomor WhatsApp wajib diisi.');
      return;
    }

    const message = `Halo PT. Dicko Jaya Construction,\nSaya *${clientName}* (${clientPhone}).\n\nSaya ingin berkonsultasi mengenai estimasi pembangunan rumah/bangunan proyek saya:\n\n*Detail Parameter:*\n- Jenis Pekerjaan: ${jobType}\n- Luas Bangunan: ${area} m²\n- Kualitas Material: ${activePkg.namaPaket}\n- Jumlah Lantai: ${floors} Lantai\n\n*Estimasi Anggaran:*\n- Range: *${formatRupiah(lowerRange)}* s.d. *${formatRupiah(upperRange)}*\n\n${clientNotes ? `*Pesan Tambahan:*\n"${clientNotes}"\n\n` : ''}Mohon hubungi saya kembali untuk mendiskusikan rancangan ini. Terima kasih!`;
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
  };

  // Navigasi langkah di atas
  const steps = [
    { title: 'Jenis', desc: 'Pekerjaan' },
    { title: 'Luas', desc: 'Meter Persegi' },
    { title: 'Kualitas', desc: 'Material Utama' },
    { title: 'Lantai', desc: 'Jumlah Lantai' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto font-sans text-stone-800">
      {/* Step Tracker (Only show for step 1 to 4) */}
      {step <= 4 && (
        <div className="mb-10">
          <div className="flex justify-between items-center relative">
            {steps.map((s, idx) => {
              const currentStep = idx + 1;
              const isCompleted = currentStep < step;
              const isActive = currentStep === step;

              return (
                <div key={idx} className="flex flex-col items-center z-10 flex-1">
                  <button 
                    onClick={() => currentStep < step && setStep(currentStep)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-amber-800 text-stone-100 cursor-pointer shadow-md' 
                        : isActive 
                          ? 'bg-amber-600 text-stone-100 ring-4 ring-amber-100 shadow-md font-extrabold scale-110' 
                          : 'bg-stone-100 text-stone-400 border border-stone-200'
                    }`}
                    disabled={currentStep > step}
                  >
                    {currentStep}
                  </button>
                  <span className={`text-[10px] uppercase font-bold tracking-widest mt-2 transition-colors duration-300 ${
                    isActive ? 'text-amber-800' : 'text-stone-400'
                  }`}>
                    {s.title}
                  </span>
                  <span className="hidden sm:block text-[9px] text-stone-500 font-medium">{s.desc}</span>
                </div>
              );
            })}

            {/* Background Line */}
            <div className="absolute top-5 left-0 w-full h-[2px] bg-stone-200 -z-0">
              <div 
                className="h-full bg-amber-800 transition-all duration-300"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Form Content */}
      <div className="bg-[#FAF9F6] border border-stone-200/80 rounded-2xl shadow-xl overflow-hidden p-6 md:p-10 min-h-[380px] flex flex-col justify-between transition-all duration-300">
        
        {/* Step 1: Jenis Pekerjaan */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full font-bold text-[10px] text-amber-800 tracking-wider uppercase mb-2">
                Quick Estimator — Langkah 1
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-stone-900 leading-tight">Apa jenis pekerjaan konstruksi Anda?</h2>
              <p className="text-xs text-stone-500 mt-1.5">Pilih salah satu kategori utama untuk memulai kalkulasi biaya kasar proyek Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {[
                { type: 'Bangun Baru', icon: Home, desc: 'Struktur beton kokoh, instalasi rapi, & finishing lengkap dari tanah kosong.' },
                { type: 'Renovasi Total', icon: Wrench, desc: 'Perombakan total, pembongkaran dinding, penguatan struktur & re-layout interior.' },
                { type: 'Renovasi Sebagian', icon: Layers, desc: 'Pekerjaan renovasi minor, pengecatan ulang, perbaikan atap, atau fasad bangunan.' },
                { type: 'Interior Saja', icon: Paintbrush, desc: 'Finishing lantai, panel dinding dekoratif (wood panel), & pengerjaan furniture kustom.' }
              ].map((item) => {
                const IconComponent = item.icon;
                const isSelected = jobType === item.type;
                return (
                  <button
                    key={item.type}
                    onClick={() => setJobType(item.type as JobType)}
                    className={`p-5 text-left border rounded-xl transition-all cursor-pointer flex gap-4 ${
                      isSelected 
                        ? 'border-amber-700 bg-amber-50/40 ring-1 ring-amber-700/50 shadow-md' 
                        : 'border-stone-200 hover:border-amber-600/40 hover:bg-stone-50/50'
                    }`}
                  >
                    <div className={`p-3 rounded-lg shrink-0 flex items-center justify-center ${
                      isSelected ? 'bg-amber-800 text-stone-100' : 'bg-stone-100 text-stone-500'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-medium text-base text-stone-900">{item.type}</h4>
                      <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Luas Bangunan */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full font-bold text-[10px] text-amber-800 tracking-wider uppercase mb-2">
                Quick Estimator — Langkah 2
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-stone-900 leading-tight">Berapa total luas area bangunan?</h2>
              <p className="text-xs text-stone-500 mt-1.5">Masukkan total luas lantai dalam satuan meter persegi (m²).</p>
            </div>

            <div className="bg-stone-50/60 border border-stone-200/60 rounded-xl p-6 md:p-8 space-y-6 max-w-xl mx-auto">
              <div className="flex items-center justify-between gap-6">
                <span className="text-xs font-bold tracking-widest text-stone-500 uppercase">LUAS BANGUNAN</span>
                <div className="flex items-center gap-2 border border-stone-300 bg-white rounded-lg px-3 py-1.5 shadow-sm max-w-[140px]">
                  <input 
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={area || ''}
                    onChange={(e) => setArea(Math.max(10, Math.min(1000, parseInt(e.target.value) || 0)))}
                    className="w-full font-serif font-semibold text-lg text-center text-amber-800 bg-transparent focus:outline-none"
                  />
                  <span className="font-bold text-xs text-stone-400">m²</span>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <input 
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={area}
                  onChange={(e) => setArea(parseInt(e.target.value) || 10)}
                  className="w-full h-1.5 bg-stone-200 appearance-none cursor-pointer rounded-lg accent-amber-700"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-medium">
                  <span>10 m²</span>
                  <span>150 m²</span>
                  <span>300 m²</span>
                  <span>500 m² +</span>
                </div>
              </div>

              {/* Shortcut buttons */}
              <div className="pt-2">
                <span className="block text-[10px] font-bold tracking-widest text-stone-500 uppercase mb-2">PILIHAN LUAS POPULER</span>
                <div className="flex flex-wrap gap-2">
                  {[36, 50, 72, 100, 150, 200, 300].map((size) => (
                    <button
                      key={size}
                      onClick={() => setArea(size)}
                      className={`px-3 py-1.5 text-xs rounded-md border font-semibold transition-all cursor-pointer ${
                        area === size 
                          ? 'bg-amber-800 text-stone-100 border-amber-800' 
                          : 'bg-white text-stone-600 border-stone-200 hover:border-amber-600/40'
                      }`}
                    >
                      {size} m²
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Kualitas Material */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full font-bold text-[10px] text-amber-800 tracking-wider uppercase mb-2">
                Quick Estimator — Langkah 3
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-stone-900 leading-tight">Pilih standar kualitas material</h2>
              <p className="text-xs text-stone-500 mt-1.5">Setiap kualitas material memiliki spesifikasi bahan yang memengaruhi harga.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {packages.map((pkg) => {
                const adjustedPrice = pkg.hargaPerM2 * jobMultiplier;
                const isSelected = selectedPkgSlug === pkg.slug;

                return (
                  <button
                    key={pkg.slug}
                    onClick={() => setSelectedPkgSlug(pkg.slug)}
                    className={`text-left p-5 border rounded-xl transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected 
                        ? 'border-amber-700 bg-amber-50/40 ring-1 ring-amber-700/50 shadow-md scale-[1.01]' 
                        : 'border-stone-200 hover:border-amber-600/40 hover:bg-stone-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-serif font-medium text-base text-stone-900 block">{pkg.namaPaket}</span>
                        {pkg.slug === 'paket-menengah' && (
                          <span className="bg-amber-800 text-stone-100 text-[8px] font-extrabold uppercase px-2 py-0.5 rounded tracking-widest shrink-0">
                            Terpopuler
                          </span>
                        )}
                      </div>
                      <span className="block text-[11px] font-bold text-amber-800 mt-1">{formatRupiah(adjustedPrice)}/m²</span>
                      <p className="text-[10px] text-stone-500 mt-2 leading-relaxed">{pkg.deskripsi}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Jumlah Lantai */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full font-bold text-[10px] text-amber-800 tracking-wider uppercase mb-2">
                Quick Estimator — Langkah 4
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-stone-900 leading-tight">Berapa jumlah lantai bangunan?</h2>
              <p className="text-xs text-stone-500 mt-1.5">Jumlah lantai berpengaruh pada struktur fondasi dan kompleksitas struktur atas.</p>
            </div>

            <div className="bg-stone-50/60 border border-stone-200/60 rounded-xl p-8 max-w-md mx-auto text-center space-y-6">
              <span className="block text-xs font-bold tracking-widest text-stone-500 uppercase">JUMLAH LANTAI</span>
              
              <div className="flex items-center justify-center gap-6">
                <button
                  type="button"
                  onClick={() => setFloors(Math.max(1, floors - 1))}
                  className="w-12 h-12 bg-white hover:bg-stone-50 border border-stone-200 rounded-full flex items-center justify-center shadow-sm text-stone-700 cursor-pointer disabled:opacity-40 transition-colors"
                  disabled={floors <= 1}
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-serif font-semibold text-4xl text-amber-800 w-16">{floors}</span>
                <button
                  type="button"
                  onClick={() => setFloors(Math.min(5, floors + 1))}
                  className="w-12 h-12 bg-white hover:bg-stone-50 border border-stone-200 rounded-full flex items-center justify-center shadow-sm text-stone-700 cursor-pointer disabled:opacity-40 transition-colors"
                  disabled={floors >= 5}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {floors > 1 && (
                <div className="flex items-start gap-2 text-left bg-amber-50/50 border border-amber-200/50 rounded-lg p-3 text-[11px] text-amber-900">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>Struktur lebih dari 1 lantai memerlukan konstruksi beton bertulang tambahan dengan biaya kompleksitas +12% per lantai ekstra.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Hasil Estimasi */}
        {step === 5 && (
          <div className="space-y-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full font-bold text-[10px] text-amber-800 tracking-wider uppercase mb-2">
                HASIL ESTIMASI PENDAHULUAN
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-stone-900">Kalkulasi Anggaran Kasar</h2>
              <p className="text-xs text-stone-500 mt-1 max-w-lg mx-auto">
                Berdasarkan parameter {jobType}, Luas {area} m², Paket {activePkg.namaPaket}, dan {floors} Lantai.
              </p>
            </div>

            {/* Range Harga */}
            <div className="bg-amber-800 text-stone-100 rounded-2xl p-6 md:p-8 text-center shadow-lg border border-amber-900 space-y-2">
              <span className="text-[10px] font-extrabold tracking-widest text-amber-200 uppercase">ESTIMASI RANGE ANGGARAN</span>
              <div className="font-serif text-2xl md:text-4xl font-normal leading-tight">
                {formatRupiah(lowerRange)} <span className="text-lg md:text-2xl text-amber-200/70 font-sans mx-1">s/d</span> {formatRupiah(upperRange)}
              </div>
              <p className="text-[10px] text-amber-100/75 max-w-md mx-auto pt-2 font-medium">
                *Sudah disesuaikan dengan faktor tingkat pengerjaan ({jobType}) dan jumlah lantai ({floors} lantai) dengan toleransi deviasi bahan ±15%.
              </p>
            </div>

            {/* Output 2 Panel: Breakdown & Form */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
              
              {/* Breakdown Biaya */}
              <div className="md:col-span-6 space-y-4">
                <h3 className="font-serif text-lg font-medium text-stone-900 border-b border-stone-200 pb-2 flex items-center justify-between">
                  <span>Komponen RAB Kasar</span>
                  <span className="font-sans text-xs text-stone-400 font-normal">Saran Pembagian</span>
                </h3>

                <div className="space-y-3.5">
                  {costBreakdown.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex justify-between text-[11px] text-stone-700 font-semibold">
                        <span>{item.name} ({item.percentage}%)</span>
                        <span>{formatRupiah(item.cost)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/30">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-stone-50 border border-stone-200/50 rounded-xl p-4 text-[10px] text-stone-500 leading-relaxed">
                  <span className="font-bold text-stone-800 block mb-1">Catatan Penting:</span>
                  Estimasi ini menggunakan metode kalkulasi volume kasar m² per standar SNI. RAB Detail yang akurat membutuhkan tinjauan langsung pada denah tata ruang, data struktur tanah, dan spesifikasi merek material yang diinginkan.
                </div>
              </div>

              {/* Lead Capture Form */}
              <div className="md:col-span-6 bg-white border border-stone-200/80 rounded-xl p-5 md:p-6 shadow-sm space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-medium text-stone-900">Dapatkan RAB Detail Gratis</h3>
                  <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                    Kirimkan estimasi ini ke tim teknis PT. Dicko Jaya Construction untuk penyusunan proposal denah dan perhitungan RAB terperinci.
                  </p>
                </div>

                <form onSubmit={handleWhatsAppSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[9px] font-bold text-stone-500 uppercase mb-1">NAMA LENGKAP *</label>
                    <input 
                      type="text"
                      required
                      placeholder="Masukkan nama Anda"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-stone-300 rounded-lg p-2.5 focus:outline-none focus:border-amber-700 text-stone-800 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-stone-500 uppercase mb-1">WHATSAPP *</label>
                      <input 
                        type="tel"
                        required
                        placeholder="Contoh: 0812345678"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-stone-300 rounded-lg p-2.5 focus:outline-none focus:border-amber-700 text-stone-800 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-stone-500 uppercase mb-1">EMAIL (OPSIONAL)</label>
                      <input 
                        type="email"
                        placeholder="nama@email.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-stone-300 rounded-lg p-2.5 focus:outline-none focus:border-amber-700 text-stone-800 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-stone-500 uppercase mb-1">CATATAN PROYEK (OPSIONAL)</label>
                    <textarea 
                      placeholder="Tuliskan detail lokasi proyek, rencana pengerjaan, atau pertanyaan Anda..."
                      rows={2}
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-stone-300 rounded-lg p-2.5 focus:outline-none focus:border-amber-700 text-stone-800 font-medium resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-stone-100 font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2 tracking-wider cursor-pointer uppercase text-[11px]"
                    >
                      <PhoneCall className="w-4 h-4" />
                      Konsultasi RAB via WhatsApp
                    </button>
                  </div>
                </form>

                <div className="text-center pt-2">
                  <a 
                    href="#calculator-detail" 
                    className="inline-flex items-center gap-1 text-[11px] text-amber-800 hover:text-amber-900 font-bold transition-colors cursor-pointer uppercase tracking-wider"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onSwitchToDetail) {
                        onSwitchToDetail();
                        // Berikan jeda singkat agar DOM selesai merender DetailEstimator
                        setTimeout(() => {
                          const detailSection = document.getElementById('calculator-detail');
                          if (detailSection) {
                            detailSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 100);
                      } else {
                        const detailSection = document.getElementById('calculator-detail');
                        if (detailSection) {
                          detailSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                  >
                    Atau Coba Estimasi Detail <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation (Only show for step 1 to 4) */}
        {step <= 4 && (
          <div className="flex justify-between items-center border-t border-stone-200/60 pt-6 mt-8">
            <button
              type="button"
              onClick={handleBack}
              className={`px-5 py-2.5 text-xs font-bold border rounded-lg transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider ${
                step === 1 
                  ? 'text-stone-300 border-stone-100 cursor-not-allowed bg-stone-50/20' 
                  : 'text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
              disabled={step === 1}
            >
              <ChevronLeft className="w-4 h-4" /> Kembali
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 text-xs font-bold bg-amber-800 hover:bg-amber-900 text-stone-100 rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              {step === 4 ? 'Hitung Estimasi' : 'Lanjut'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
