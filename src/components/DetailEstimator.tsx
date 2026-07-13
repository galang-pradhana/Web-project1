import React, { useState } from 'react';
import { calculateDetailedRAB, formatRupiah } from '../utils/rab-formula';
import type { AHSPItem, Material, Wage } from '../utils/rab-formula';
import { 
  Plus, 
  Trash2, 
  FileText, 
  Phone, 
  User, 
  MapPin, 
  ShoppingBag, 
  ChevronUp, 
  X,
  Calculator,
  Sliders
} from 'lucide-react';

interface DetailEstimatorProps {
  ahspItems: AHSPItem[];
  materials: Material[];
  wages: Wage[];
  whatsappNumber: string;
  initialData?: {
    clientName?: string;
    clientWhatsapp?: string;
    clientEmail?: string;
    lokasi?: string;
    luasBangunan?: number;
    items?: { slug: string; volume: number }[];
    profitRate?: number;
    taxRate?: number;
  };
}

export const DetailEstimator: React.FC<DetailEstimatorProps> = ({
  ahspItems,
  materials,
  wages,
  whatsappNumber,
  initialData
}) => {
  // Client Info States
  const [clientName, setClientName] = useState(initialData?.clientName || '');
  const [clientWhatsapp, setClientWhatsapp] = useState(initialData?.clientWhatsapp || '');
  const [clientEmail, setClientEmail] = useState(initialData?.clientEmail || '');
  const [projectLocation, setProjectLocation] = useState(initialData?.lokasi || '');
  const [projectArea, setProjectArea] = useState<number>(initialData?.luasBangunan || 0);

  // Selected work items
  const [selectedItems, setSelectedItems] = useState<{ slug: string; volume: number }[]>(
    initialData?.items || [
      { slug: 'galian-tanah-keras', volume: 45 },
      { slug: 'pasang-pondasi-batu-kali', volume: 20 },
      { slug: 'pasang-dinding-bata', volume: 150 }
    ]
  );

  // Temporary state for adding item
  const [tempItemSlug, setTempItemSlug] = useState(ahspItems[0]?.slug || '');
  const [tempVolume, setTempVolume] = useState<number>(10);

  // Profit and Tax sliders
  const [profitRate, setProfitRate] = useState<number>(initialData?.profitRate !== undefined ? initialData.profitRate : 10);
  const [taxRate, setTaxRate] = useState<number>(initialData?.taxRate !== undefined ? initialData.taxRate : 11);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'pekerjaan' | 'material' | 'upah'>('pekerjaan');

  // Mobile Bottom Sheet State
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  // Loading States
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  // Map collections for fast lookup in formulas
  const ahspRecord = React.useMemo(() => {
    const rec: Record<string, any> = {};
    ahspItems.forEach(item => { rec[item.slug] = item; });
    return rec;
  }, [ahspItems]);

  const materialsRecord = React.useMemo(() => {
    const rec: Record<string, any> = {};
    materials.forEach(item => { rec[item.slug] = item; });
    return rec;
  }, [materials]);

  const wagesRecord = React.useMemo(() => {
    const rec: Record<string, any> = {};
    wages.forEach(item => { rec[item.slug] = item; });
    return rec;
  }, [wages]);

  // Run calculation client-side in real-time
  const calculation = React.useMemo(() => {
    return calculateDetailedRAB(
      selectedItems,
      ahspRecord,
      materialsRecord,
      wagesRecord,
      taxRate,
      profitRate
    );
  }, [selectedItems, ahspRecord, materialsRecord, wagesRecord, taxRate, profitRate]);

  // Handlers
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempItemSlug) return;
    
    const existingIdx = selectedItems.findIndex(i => i.slug === tempItemSlug);
    if (existingIdx !== -1) {
      const updated = [...selectedItems];
      updated[existingIdx].volume += tempVolume;
      setSelectedItems(updated);
    } else {
      setSelectedItems([...selectedItems, { slug: tempItemSlug, volume: tempVolume }]);
    }
  };

  const handleUpdateVolume = (slug: string, newVolume: number) => {
    const updated = selectedItems.map(item => 
      item.slug === slug ? { ...item, volume: Math.max(0, newVolume) } : item
    );
    setSelectedItems(updated.filter(item => item.volume > 0));
  };

  const handleRemoveItem = (slug: string) => {
    setSelectedItems(selectedItems.filter(item => item.slug !== slug));
  };



  const handleDownloadPDF = async () => {
    if (selectedItems.length === 0) {
      alert('Pilih minimal satu item pekerjaan terlebih dahulu.');
      return;
    }
    if (!clientName || !clientWhatsapp) {
      alert('Mohon isi Nama Klien dan Nomor WhatsApp di panel Informasi Proyek terlebih dahulu.');
      return;
    }
    
    setIsPdfLoading(true);
    try {
      let calcId = null;
      try {
        const calcResponse = await fetch('/api/rab-save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jenisPekerjaan: 'Kustom Detail',
            luasBangunan: projectArea,
            lokasi: projectLocation,
            items: selectedItems,
            profitRate,
            taxRate,
            subtotal: calculation.subtotal,
            totalCost: calculation.totalCost
          })
        });
        if (calcResponse.ok) {
          const calcData = await calcResponse.json();
          calcId = calcData.id;

          await fetch('/api/rab-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nama: clientName,
              whatsapp: clientWhatsapp,
              email: clientEmail,
              calculationId: calcId,
              sumberMode: 'detail'
            })
          });
        }
      } catch (saveErr) {
        console.warn('Gagal melakukan background save:', saveErr);
      }

      const response = await fetch('/api/rab-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientName || 'Klien PT. DJC kontraktor',
          projectLocation: projectLocation || 'Indonesia',
          projectArea: projectArea || 0,
          items: selectedItems,
          taxRatePercent: taxRate,
          profitRatePercent: profitRate
        })
      });

      if (!response.ok) {
        throw new Error('Gagal menghasilkan file PDF.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `RAB_PT_DJC_kontraktor_${(clientName || 'Estimasi').replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Terjadi kesalahan saat mengunduh PDF.');
    } finally {
      setIsPdfLoading(false);
    }
  };

  const handleWhatsAppConsultation = async () => {
    if (!clientName || !clientWhatsapp) {
      alert('Mohon isi Nama Klien dan Nomor WhatsApp di panel Informasi Proyek terlebih dahulu.');
      return;
    }

    const message = `Halo PT. DJC kontraktor, nama saya *${clientName}* (${clientWhatsapp}).\nSaya telah menghitung estimasi RAB detail untuk proyek pembangunan dengan parameter berikut:\n\n` +
      `*Detail Proyek:*\n` +
      `- Lokasi: ${projectLocation || '-'}\n` +
      `- Luas Bangunan: ${projectArea || '-'} m²\n` +
      `- Jumlah Item Pekerjaan: ${selectedItems.length}\n` +
      `- Subtotal Pekerjaan: ${formatRupiah(calculation.subtotal)}\n` +
      `- Fee Kontraktor (${profitRate}%): ${formatRupiah(calculation.profitCost)}\n` +
      `- PPN (${taxRate}%): ${formatRupiah(calculation.taxCost)}\n` +
      `*TOTAL BIAYA: ${formatRupiah(calculation.totalCost)}*\n\n` +
      `Saya ingin berkonsultasi mengenai detail spesifikasi material dan penjadwalan pembangunan. Mohon informasinya!`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  // Content render helper for Summary
  const renderSummaryContent = (isMobile: boolean = false) => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-stone-200/80 pb-4">
        <div>
          <span className="block font-sans text-[10px] text-stone-500 uppercase tracking-widest font-bold">Luas: {projectArea || 0} m² • Lokasi: {projectLocation || 'INDONESIA'}</span>
          <h4 className="font-serif text-xl font-medium text-stone-900 uppercase">Ringkasan Estimasi</h4>
        </div>
        <div className="text-left sm:text-right">
          <span className="block font-sans text-[10px] text-stone-500 uppercase tracking-widest font-bold">TOTAL ESTIMASI AKHIR</span>
          <span className="block font-serif font-semibold text-2xl text-amber-800">{formatRupiah(calculation.totalCost)}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 font-sans text-center text-xs">
        <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-lg">
          <span className="block text-[9px] text-stone-500 font-bold uppercase tracking-wider mb-0.5">SUBTOTAL</span>
          <span className="font-bold text-stone-800">{formatRupiah(calculation.subtotal)}</span>
        </div>
        <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-lg">
          <span className="block text-[9px] text-stone-500 font-bold uppercase tracking-wider mb-0.5">FEE ({profitRate}%)</span>
          <span className="font-bold text-stone-800">{formatRupiah(calculation.profitCost)}</span>
        </div>
        <div className="bg-stone-50 border border-stone-200/60 p-3 rounded-lg">
          <span className="block text-[9px] text-stone-500 font-bold uppercase tracking-wider mb-0.5">PPN ({taxRate}%)</span>
          <span className="font-bold text-stone-800">{formatRupiah(calculation.taxCost)}</span>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={handleDownloadPDF}
          disabled={isPdfLoading}
          className="py-3 bg-amber-800 hover:bg-amber-900 text-stone-100 font-bold rounded-lg shadow-sm transition-colors text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          <FileText className="w-4 h-4" />
          {isPdfLoading ? 'MENYUSUN PDF...' : 'UNDUH PDF'}
        </button>
        <button
          onClick={handleWhatsAppConsultation}
          className="py-3 bg-transparent text-stone-800 hover:bg-stone-50 font-bold border border-stone-300 rounded-lg transition-colors text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Phone className="w-4 h-4" />
          KONSULTASI WA
        </button>
      </div>
    </div>
  );

  return (
    <div id="calculator-detail" className="font-sans text-stone-800 pb-20 lg:pb-0">
      
      {/* 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Parameters, Add Items, Adjusters */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Project Metadata */}
          <div className="border border-stone-200/80 p-6 bg-[#FAF9F6] rounded-2xl shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-medium text-stone-900 uppercase border-b border-stone-200/60 pb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-amber-700" /> 1. Informasi Proyek
            </h3>
            
            <div className="space-y-4 font-sans text-xs">
              <div>
                <label className="block mb-1 font-bold text-stone-500 tracking-wider uppercase text-[9px]">Nama Klien *</label>
                <input 
                  type="text" 
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="Masukkan Nama Lengkap"
                  required
                  className="w-full bg-white border border-stone-300 rounded-lg p-3 focus:outline-none focus:border-amber-700 text-stone-800 font-medium transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-bold text-stone-500 tracking-wider uppercase text-[9px]">Nomor WhatsApp *</label>
                  <input 
                    type="tel" 
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={clientWhatsapp}
                    onChange={e => setClientWhatsapp(e.target.value)}
                    placeholder="Contoh: 0812345678"
                    required
                    className="w-full bg-white border border-stone-300 rounded-lg p-3 focus:outline-none focus:border-amber-700 text-stone-800 font-medium transition-colors"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold text-stone-500 tracking-wider uppercase text-[9px]">Email (Opsional)</label>
                  <input 
                    type="email" 
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                    placeholder="nama@domain.com"
                    className="w-full bg-white border border-stone-300 rounded-lg p-3 focus:outline-none focus:border-amber-700 text-stone-800 font-medium transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-bold text-stone-500 tracking-wider uppercase text-[9px]">Lokasi Pembangunan</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={projectLocation}
                      onChange={e => setProjectLocation(e.target.value)}
                      placeholder="Contoh: Bandung"
                      className="w-full bg-white border border-stone-300 rounded-lg p-3 pl-9 focus:outline-none focus:border-amber-700 text-stone-800 font-medium transition-colors"
                    />
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-bold text-stone-500 tracking-wider uppercase text-[9px]">Luas Bangunan (m²)</label>
                  <input 
                    type="number" 
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={projectArea || ''}
                    onChange={e => setProjectArea(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="Luas Area"
                    className="w-full bg-white border border-stone-300 rounded-lg p-3 focus:outline-none focus:border-amber-700 text-stone-800 font-bold transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Add Work Item Form */}
          <div className="border border-stone-200/80 p-6 bg-[#FAF9F6] rounded-2xl shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-medium text-stone-900 uppercase border-b border-stone-200/60 pb-2 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-700" /> 2. Tambah Item Pekerjaan
            </h3>
            
            <form onSubmit={handleAddItem} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block mb-1 font-bold text-stone-500 tracking-wider uppercase text-[9px]">Jenis Pekerjaan AHSP</label>
                <select
                  value={tempItemSlug}
                  onChange={e => setTempItemSlug(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg p-3 focus:outline-none focus:border-amber-700 text-stone-800 font-medium cursor-pointer transition-colors"
                >
                  {ahspItems.map(item => (
                    <option key={item.slug} value={item.slug}>
                      [{item.kodeAHSP}] {item.namaPekerjaan} ({item.satuanVolume})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-bold text-stone-500 tracking-wider uppercase text-[9px]">Volume Pekerjaan</label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    step="any"
                    inputMode="decimal"
                    value={tempVolume || ''}
                    onChange={e => setTempVolume(Math.max(0, parseFloat(e.target.value) || 0))}
                    placeholder="Volume"
                    required
                    className="flex-1 bg-white border border-stone-300 rounded-lg p-3 focus:outline-none focus:border-amber-700 text-stone-800 font-bold transition-colors"
                  />
                  <div className="bg-stone-100 border border-stone-300 rounded-lg px-4 py-3 flex items-center justify-center font-bold text-stone-500 text-xs shrink-0">
                    {ahspRecord[tempItemSlug]?.satuanVolume || '-'}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-stone-100 font-bold rounded-lg shadow-sm transition-colors text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Tambah Ke Daftar RAB
              </button>
            </form>
          </div>

          {/* Adjusters (Sliders) */}
          <div className="border border-stone-200/80 p-6 bg-[#FAF9F6] rounded-2xl shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-medium text-stone-900 uppercase border-b border-stone-200/60 pb-2 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-700" /> 3. Profit & Pajak
            </h3>
            
            <div className="space-y-5 font-sans text-xs">
              <div className="space-y-2">
                <div className="flex justify-between items-center font-bold tracking-wider text-[9px]">
                  <span>FEE KONTRAKTOR / PROFIT</span>
                  <span className="text-amber-800 font-bold text-xs">{profitRate}%</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="30"
                  value={profitRate}
                  onChange={e => setProfitRate(parseInt(e.target.value) || 0)}
                  className="w-full h-1.5 bg-stone-200 appearance-none cursor-pointer rounded-lg accent-amber-700"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center font-bold tracking-wider text-[9px]">
                  <span>PAJAK (PPN)</span>
                  <span className="text-amber-800 font-bold text-xs">{taxRate}%</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="20"
                  value={taxRate}
                  onChange={e => setTaxRate(parseInt(e.target.value) || 0)}
                  className="w-full h-1.5 bg-stone-200 appearance-none cursor-pointer rounded-lg accent-amber-700"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Tabular List & Desktop Summary */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Desktop Summary Panel (Hidden on Mobile) */}
          <div className="hidden lg:block border border-stone-200/80 p-6 bg-[#FAF9F6] rounded-2xl shadow-sm">
            {renderSummaryContent(false)}
          </div>

          {/* Detailed Breakdown Tabs */}
          <div className="border border-stone-200/80 bg-[#FAF9F6] rounded-2xl shadow-sm overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-stone-200 font-serif text-xs uppercase font-medium bg-stone-50/50">
              <button 
                onClick={() => setActiveTab('pekerjaan')}
                className={`flex-1 py-4 text-center cursor-pointer border-r border-stone-200 transition-all ${
                  activeTab === 'pekerjaan' 
                    ? 'bg-amber-800 text-stone-100 font-bold' 
                    : 'bg-transparent text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                Daftar Pekerjaan
              </button>
              <button 
                onClick={() => setActiveTab('material')}
                className={`flex-1 py-4 text-center cursor-pointer border-r border-stone-200 transition-all ${
                  activeTab === 'material' 
                    ? 'bg-amber-800 text-stone-100 font-bold' 
                    : 'bg-transparent text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                Material (BOM)
              </button>
              <button 
                onClick={() => setActiveTab('upah')}
                className={`flex-1 py-4 text-center cursor-pointer transition-all ${
                  activeTab === 'upah' 
                    ? 'bg-amber-800 text-stone-100 font-bold' 
                    : 'bg-transparent text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                Tenaga Kerja
              </button>
            </div>

            <div className="p-5 overflow-y-auto max-h-[500px] custom-scrollbar">
              
              {/* Tab: Pekerjaan */}
              {activeTab === 'pekerjaan' && (
                <div className="space-y-4">
                  {selectedItems.length === 0 ? (
                    <div className="text-center py-12 space-y-2">
                      <ShoppingBag className="w-8 h-8 text-stone-300 mx-auto" />
                      <p className="font-sans text-xs text-stone-500 font-medium">Daftar item pekerjaan kosong. Silakan tambahkan item di panel kiri.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full font-sans text-xs text-left border-collapse min-w-[550px]">
                        <thead>
                          <tr className="border-b border-stone-200 text-[9px] text-stone-400 font-bold uppercase tracking-wider">
                            <th className="py-2 pb-3">Kode</th>
                            <th className="py-2 pb-3">Pekerjaan</th>
                            <th className="py-2 pb-3 text-right">Volume</th>
                            <th className="py-2 pb-3 text-right">Harga Satuan</th>
                            <th className="py-2 pb-3 text-right">Subtotal</th>
                            <th className="py-2 pb-3 text-center">Hapus</th>
                          </tr>
                        </thead>
                        <tbody>
                          {calculation.items.map((item) => (
                            <tr key={item.slug} className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                              <td className="py-3 font-semibold text-stone-500">{item.kodeAHSP || '-'}</td>
                              <td className="py-3 pr-4 max-w-[200px]">
                                <span className="block font-semibold text-stone-900 leading-tight">{item.namaPekerjaan}</span>
                                <span className="block text-[9px] text-stone-400 mt-0.5">{item.kategoriPekerjaan}</span>
                              </td>
                              <td className="py-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <input 
                                    type="number"
                                    step="any"
                                    inputMode="decimal"
                                    value={item.volume}
                                    onChange={e => handleUpdateVolume(item.slug, parseFloat(e.target.value) || 0)}
                                    className="w-12 bg-white border border-stone-300 rounded px-1.5 py-0.5 text-right font-bold text-amber-800 focus:outline-none focus:border-amber-700 text-xs"
                                  />
                                  <span className="text-[10px] text-stone-400 font-semibold">{item.satuanVolume}</span>
                                </div>
                              </td>
                              <td className="py-3 text-right text-stone-600 font-medium">{formatRupiah(item.unitRate)}</td>
                              <td className="py-3 text-right font-bold text-stone-900">{formatRupiah(item.totalCost)}</td>
                              <td className="py-3 text-center">
                                <button 
                                  onClick={() => handleRemoveItem(item.slug)}
                                  className="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded transition-colors cursor-pointer"
                                  title="Hapus Item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Material (BOM) */}
              {activeTab === 'material' && (
                <div className="space-y-4">
                  {calculation.billOfMaterials.length === 0 ? (
                    <div className="text-center py-12 text-stone-400">
                      <p className="font-sans text-xs font-medium">Bahan material akan otomatis terhitung setelah Anda menambahkan item pekerjaan.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full font-sans text-xs text-left border-collapse min-w-[500px]">
                        <thead>
                          <tr className="border-b border-stone-200 text-[9px] text-stone-400 font-bold uppercase tracking-wider">
                            <th className="py-2 pb-3">Nama Material</th>
                            <th className="py-2 pb-3 text-center">Satuan</th>
                            <th className="py-2 pb-3 text-right">Volume Total</th>
                            <th className="py-2 pb-3 text-right">Harga Satuan</th>
                            <th className="py-2 pb-3 text-right">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {calculation.billOfMaterials.map((mat, idx) => (
                            <tr key={idx} className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                              <td className="py-3 font-semibold text-stone-900 leading-tight">{mat.nama}</td>
                              <td className="py-3 text-center text-stone-500 font-medium">{mat.satuan}</td>
                              <td className="py-3 text-right font-bold text-stone-800">{mat.totalVolume.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 3 })}</td>
                              <td className="py-3 text-right text-stone-600 font-medium">{formatRupiah(mat.hargaSatuan)}</td>
                              <td className="py-3 text-right font-bold text-stone-900">{formatRupiah(mat.subtotal)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Tenaga Kerja */}
              {activeTab === 'upah' && (
                <div className="space-y-4">
                  {calculation.laborRequirements.length === 0 ? (
                    <div className="text-center py-12 text-stone-400">
                      <p className="font-sans text-xs font-medium">Tenaga kerja akan otomatis terhitung setelah Anda menambahkan item pekerjaan.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full font-sans text-xs text-left border-collapse min-w-[450px]">
                        <thead>
                          <tr className="border-b border-stone-200 text-[9px] text-stone-400 font-bold uppercase tracking-wider">
                            <th className="py-2 pb-3">Tenaga Kerja</th>
                            <th className="py-2 pb-3 text-center">Satuan</th>
                            <th className="py-2 pb-3 text-right">OH (Hari Orang)</th>
                            <th className="py-2 pb-3 text-right">Tarif Harian</th>
                            <th className="py-2 pb-3 text-right">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {calculation.laborRequirements.map((lab, idx) => (
                            <tr key={idx} className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                              <td className="py-3 font-semibold text-stone-900 leading-tight">{lab.jenisPekerja}</td>
                              <td className="py-3 text-center text-stone-500 font-medium">{lab.satuan}</td>
                              <td className="py-3 text-right font-bold text-stone-800">{lab.totalOH.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 3 })}</td>
                              <td className="py-3 text-right text-stone-600 font-medium">{formatRupiah(lab.tarifHarian)}</td>
                              <td className="py-3 text-right font-bold text-stone-900">{formatRupiah(lab.subtotal)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* MOBILE ONLY: Sticky Bottom Sheet Banner */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-stone-900 border-t border-stone-800 text-stone-100 z-50 px-4 py-3 shadow-2xl flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">Total RAB Detail ({selectedItems.length} Item)</span>
          <span className="font-serif text-lg font-semibold text-amber-500 leading-tight">{formatRupiah(calculation.totalCost)}</span>
        </div>
        <button
          onClick={() => setIsBottomSheetOpen(true)}
          className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-stone-100 px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-1 shadow cursor-pointer transition-colors uppercase tracking-wider"
        >
          Lihat Ringkasan <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      {/* MOBILE ONLY: Bottom Sheet Drawer */}
      {isBottomSheetOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsBottomSheetOpen(false)}
          ></div>
          
          {/* Sheet */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#FAF9F6] border-t border-stone-200 rounded-t-3xl z-50 shadow-2xl max-h-[85vh] overflow-y-auto px-6 pt-5 pb-8 transition-transform duration-300">
            {/* Header Handle Bar */}
            <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-4"></div>
            
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-lg font-medium text-stone-900">RINGKASAN ESTIMASI</h3>
              <button 
                onClick={() => setIsBottomSheetOpen(false)}
                className="p-1 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Summary */}
            {renderSummaryContent(true)}
          </div>
        </>
      )}

    </div>
  );
};
