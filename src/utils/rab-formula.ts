// src/utils/rab-formula.ts

export interface Material {
  slug: string;
  nama: string;
  satuan: string;
  hargaSatuan: number;
  kategori: string;
}

export interface Wage {
  slug: string;
  jenisPekerja: string;
  satuan: string;
  hargaSatuan: number;
}

export interface AHSPComponent {
  bahanRef: string;
  koefisien: number;
}

export interface AHSPWageComponent {
  upahRef: string;
  koefisien: number;
}

export interface AHSPItem {
  slug: string;
  namaPekerjaan: string;
  kodeAHSP: string;
  kategoriPekerjaan: string;
  satuanVolume: string;
  bahanKomponen?: AHSPComponent[];
  upahKomponen?: AHSPWageComponent[];
}

export interface Package {
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

/**
 * Calculates the unit cost rate of an AHSP Item (harga satuan pekerjaan).
 */
export function calculateAHSPRate(
  item: AHSPItem,
  materials: Record<string, Material>,
  wages: Record<string, Wage>
): {
  materialCost: number;
  laborCost: number;
  totalRate: number;
  bahanBreakdown: { nama: string; harga: number; koefisien: number; subtotal: number }[];
  upahBreakdown: { jenisPekerja: string; harga: number; koefisien: number; subtotal: number }[];
} {
  let materialCost = 0;
  let laborCost = 0;
  
  const bahanBreakdown: any[] = [];
  const upahBreakdown: any[] = [];

  // 1. Calculate materials cost
  if (item.bahanKomponen && Array.isArray(item.bahanKomponen)) {
    item.bahanKomponen.forEach((comp) => {
      const mat = materials[comp.bahanRef];
      if (mat) {
        const subtotal = mat.hargaSatuan * comp.koefisien;
        materialCost += subtotal;
        bahanBreakdown.push({
          nama: mat.nama,
          harga: mat.hargaSatuan,
          koefisien: comp.koefisien,
          subtotal
        });
      }
    });
  }

  // 2. Calculate labor cost
  if (item.upahKomponen && Array.isArray(item.upahKomponen)) {
    item.upahKomponen.forEach((comp) => {
      const wage = wages[comp.upahRef];
      if (wage) {
        const subtotal = wage.hargaSatuan * comp.koefisien;
        laborCost += subtotal;
        upahBreakdown.push({
          jenisPekerja: wage.jenisPekerja,
          harga: wage.hargaSatuan,
          koefisien: comp.koefisien,
          subtotal
        });
      }
    });
  }

  const totalRate = materialCost + laborCost;

  return {
    materialCost,
    laborCost,
    totalRate,
    bahanBreakdown,
    upahBreakdown
  };
}

/**
 * Perform Detailed RAB Calculation.
 */
export function calculateDetailedRAB(
  selectedItems: { slug: string; volume: number }[],
  ahspItems: Record<string, AHSPItem>,
  materials: Record<string, Material>,
  wages: Record<string, Wage>,
  taxRatePercent = 0,
  profitRatePercent = 0
) {
  let subtotalCost = 0;
  const itemsBreakdown: any[] = [];
  
  // To aggregate total material usage (BOM)
  const materialUsage: Record<string, { nama: string; satuan: string; totalVolume: number; hargaSatuan: number; subtotal: number }> = {};
  
  // To aggregate total labor usage
  const laborUsage: Record<string, { jenisPekerja: string; satuan: string; totalOH: number; tarifHarian: number; subtotal: number }> = {};

  selectedItems.forEach((selection) => {
    const item = ahspItems[selection.slug];
    if (!item) return;

    const volume = selection.volume;
    const rateData = calculateAHSPRate(item, materials, wages);
    const itemTotal = rateData.totalRate * volume;
    subtotalCost += itemTotal;

    itemsBreakdown.push({
      slug: item.slug,
      namaPekerjaan: item.namaPekerjaan,
      kodeAHSP: item.kodeAHSP,
      kategoriPekerjaan: item.kategoriPekerjaan,
      satuanVolume: item.satuanVolume,
      volume,
      unitRate: rateData.totalRate,
      materialRate: rateData.materialCost,
      laborRate: rateData.laborCost,
      totalCost: itemTotal
    });

    // Aggregate Material Needs (BOM)
    if (item.bahanKomponen) {
      item.bahanKomponen.forEach((comp) => {
        const mat = materials[comp.bahanRef];
        if (!mat) return;
        
        const totalNeeded = comp.koefisien * volume;
        if (!materialUsage[comp.bahanRef]) {
          materialUsage[comp.bahanRef] = {
            nama: mat.nama,
            satuan: mat.satuan,
            totalVolume: 0,
            hargaSatuan: mat.hargaSatuan,
            subtotal: 0
          };
        }
        materialUsage[comp.bahanRef].totalVolume += totalNeeded;
        materialUsage[comp.bahanRef].subtotal += totalNeeded * mat.hargaSatuan;
      });
    }

    // Aggregate Labor Needs
    if (item.upahKomponen) {
      item.upahKomponen.forEach((comp) => {
        const wage = wages[comp.upahRef];
        if (!wage) return;

        const totalNeeded = comp.koefisien * volume;
        if (!laborUsage[comp.upahRef]) {
          laborUsage[comp.upahRef] = {
            jenisPekerja: wage.jenisPekerja,
            satuan: wage.satuan,
            totalOH: 0,
            tarifHarian: wage.hargaSatuan,
            subtotal: 0
          };
        }
        laborUsage[comp.upahRef].totalOH += totalNeeded;
        laborUsage[comp.upahRef].subtotal += totalNeeded * wage.hargaSatuan;
      });
    }
  });

  const profitCost = subtotalCost * (profitRatePercent / 100);
  const costBeforeTax = subtotalCost + profitCost;
  const taxCost = costBeforeTax * (taxRatePercent / 100);
  const totalCost = costBeforeTax + taxCost;

  return {
    subtotal: subtotalCost,
    profitCost,
    taxCost,
    totalCost,
    items: itemsBreakdown,
    billOfMaterials: Object.values(materialUsage),
    laborRequirements: Object.values(laborUsage)
  };
}

/**
 * Format currency to IDR Rupiah
 */
export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}
