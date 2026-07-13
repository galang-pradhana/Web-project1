import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Simple helper to format currency
const formatPDFRupiah = (value: number) => {
  return 'Rp ' + new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#1a1a1a',
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingBottom: 10
  },
  title: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4
  },
  subtitle: {
    fontSize: 10,
    color: '#555555',
    fontFamily: 'Helvetica'
  },
  metaSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e5e5e5'
  },
  metaCol: {
    flexDirection: 'column',
    width: '48%'
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 3
  },
  metaLabel: {
    width: 80,
    fontFamily: 'Helvetica-Bold',
    color: '#555555'
  },
  metaValue: {
    flex: 1,
    color: '#1a1a1a'
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginTop: 15,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    paddingBottom: 2
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    marginBottom: 15
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
    padding: 5
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    padding: 5
  },
  tableRowAlternating: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#fafafa',
    padding: 5
  },
  // Column Widths for Items Table
  colNo: { width: '5%', textAlign: 'center' },
  colCode: { width: '12%', textAlign: 'left' },
  colName: { width: '38%', textAlign: 'left' },
  colUnit: { width: '8%', textAlign: 'center' },
  colVol: { width: '10%', textAlign: 'right' },
  colRate: { width: '12%', textAlign: 'right' },
  colSub: { width: '15%', textAlign: 'right' },
  
  // Column Widths for BOM / Labor Table
  colBOMName: { width: '50%', textAlign: 'left' },
  colBOMUnit: { width: '10%', textAlign: 'center' },
  colBOMVol: { width: '12%', textAlign: 'right' },
  colBOMRate: { width: '13%', textAlign: 'right' },
  colBOMSub: { width: '15%', textAlign: 'right' },

  summarySection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 20
  },
  summaryBox: {
    width: 250,
    borderWidth: 1,
    borderColor: '#000000',
    padding: 10,
    backgroundColor: '#fafafa'
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  summaryRowBold: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#000000',
    fontFamily: 'Helvetica-Bold'
  },
  disclaimer: {
    marginTop: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    fontSize: 7,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 1.3
  }
});

interface RABPdfDocumentProps {
  clientName: string;
  projectLocation: string;
  projectArea: number;
  calculatorResults: {
    subtotal: number;
    profitCost: number;
    taxCost: number;
    totalCost: number;
    items: {
      slug: string;
      namaPekerjaan: string;
      kodeAHSP: string;
      kategoriPekerjaan: string;
      satuanVolume: string;
      volume: number;
      unitRate: number;
      totalCost: number;
    }[];
    billOfMaterials: {
      nama: string;
      satuan: string;
      totalVolume: number;
      hargaSatuan: number;
      subtotal: number;
    }[];
    laborRequirements: {
      jenisPekerja: string;
      satuan: string;
      totalOH: number;
      tarifHarian: number;
      subtotal: number;
    }[];
  };
}

export const RABPdfDocument: React.FC<RABPdfDocumentProps> = ({
  clientName,
  projectLocation,
  projectArea,
  calculatorResults
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>PT. DJC kontraktor — Rencana Anggaran Biaya (RAB)</Text>
          <Text style={styles.subtitle}>Dokumen Estimasi Anggaran Pembangunan Konstruksi Standar AHSP SNI</Text>
        </View>

        {/* Metadata */}
        <View style={styles.metaSection}>
          <View style={styles.metaCol}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Klien:</Text>
              <Text style={styles.metaValue}>{clientName || 'N/A'}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Lokasi:</Text>
              <Text style={styles.metaValue}>{projectLocation || 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.metaCol}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Luas Area:</Text>
              <Text style={styles.metaValue}>{projectArea ? `${projectArea} m²` : 'N/A'}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Tanggal:</Text>
              <Text style={styles.metaValue}>{new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
            </View>
          </View>
        </View>

        {/* 1. Detail Pekerjaan */}
        <Text style={styles.sectionTitle}>1. Rincian Pekerjaan Konstruksi (AHSP SNI)</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colNo}>No</Text>
            <Text style={styles.colCode}>Kode</Text>
            <Text style={styles.colName}>Item Pekerjaan</Text>
            <Text style={styles.colUnit}>Sat</Text>
            <Text style={styles.colVol}>Volume</Text>
            <Text style={styles.colRate}>Harga Sat</Text>
            <Text style={styles.colSub}>Total</Text>
          </View>
          
          {calculatorResults.items.map((item, idx) => (
            <View key={item.slug} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlternating}>
              <Text style={styles.colNo}>{idx + 1}</Text>
              <Text style={styles.colCode}>{item.kodeAHSP || '-'}</Text>
              <Text style={styles.colName}>{item.namaPekerjaan}</Text>
              <Text style={styles.colUnit}>{item.satuanVolume}</Text>
              <Text style={styles.colVol}>{item.volume.toFixed(2)}</Text>
              <Text style={styles.colRate}>{formatPDFRupiah(item.unitRate)}</Text>
              <Text style={styles.colSub}>{formatPDFRupiah(item.totalCost)}</Text>
            </View>
          ))}
        </View>

        {/* 2. Bill of Materials (BOM) */}
        <Text style={styles.sectionTitle}>2. Kebutuhan Bahan Material (Est. Bill of Materials)</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colNo}>No</Text>
            <Text style={styles.colBOMName}>Nama Material</Text>
            <Text style={styles.colBOMUnit}>Satuan</Text>
            <Text style={styles.colBOMVol}>Volume</Text>
            <Text style={styles.colBOMRate}>Harga Satuan</Text>
            <Text style={styles.colBOMSub}>Subtotal</Text>
          </View>
          
          {calculatorResults.billOfMaterials.map((mat, idx) => (
            <View key={idx} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlternating}>
              <Text style={styles.colNo}>{idx + 1}</Text>
              <Text style={styles.colBOMName}>{mat.nama}</Text>
              <Text style={styles.colBOMUnit}>{mat.satuan}</Text>
              <Text style={styles.colBOMVol}>{mat.totalVolume.toFixed(2)}</Text>
              <Text style={styles.colBOMRate}>{formatPDFRupiah(mat.hargaSatuan)}</Text>
              <Text style={styles.colBOMSub}>{formatPDFRupiah(mat.subtotal)}</Text>
            </View>
          ))}
        </View>

        {/* 3. Labor Requirements */}
        <Text style={styles.sectionTitle}>3. Kebutuhan Tenaga Kerja (Est. Upah Kerja)</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colNo}>No</Text>
            <Text style={styles.colBOMName}>Tenaga Kerja</Text>
            <Text style={styles.colBOMUnit}>Satuan</Text>
            <Text style={styles.colBOMVol}>Jumlah (OH)</Text>
            <Text style={styles.colBOMRate}>Tarif Harian</Text>
            <Text style={styles.colBOMSub}>Subtotal</Text>
          </View>
          
          {calculatorResults.laborRequirements.map((lab, idx) => (
            <View key={idx} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlternating}>
              <Text style={styles.colNo}>{idx + 1}</Text>
              <Text style={styles.colBOMName}>{lab.jenisPekerja}</Text>
              <Text style={styles.colBOMUnit}>{lab.satuan}</Text>
              <Text style={styles.colBOMVol}>{lab.totalOH.toFixed(2)}</Text>
              <Text style={styles.colBOMRate}>{formatPDFRupiah(lab.tarifHarian)}</Text>
              <Text style={styles.colBOMSub}>{formatPDFRupiah(lab.subtotal)}</Text>
            </View>
          ))}
        </View>

        {/* Summary Box */}
        <View style={styles.summarySection}>
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={{ color: '#555555' }}>Subtotal Pekerjaan:</Text>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>{formatPDFRupiah(calculatorResults.subtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={{ color: '#555555' }}>Fee Kontraktor:</Text>
              <Text>{formatPDFRupiah(calculatorResults.profitCost)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={{ color: '#555555' }}>PPN:</Text>
              <Text>{formatPDFRupiah(calculatorResults.taxCost)}</Text>
            </View>
            <View style={styles.summaryRowBold}>
              <Text>TOTAL BIAYA:</Text>
              <Text style={{ color: '#8c6239' }}>{formatPDFRupiah(calculatorResults.totalCost)}</Text>
            </View>
          </View>
        </View>

        {/* Footer Disclaimer */}
        <View style={styles.disclaimer}>
          <Text>
            Catatan: Hasil estimasi biaya (RAB) ini bersifat perkiraan kasar berdasarkan harga material dan upah harian standar nasional yang terdaftar pada sistem kami. Biaya sebenarnya dapat bervariasi bergantung pada spesifikasi teknis akhir, kondisi tanah lapangan, dan fluktuasi harga pasar riil.
          </Text>
          <Text style={{ marginTop: 4 }}>
            PT. DJC kontraktor • Kp. Baru RT 010 / RW 003, Kel. Kosambi Dalam, Kec. Mekar Baru, Tangerang - Banten
          </Text>
        </View>

      </Page>
    </Document>
  );
};
