import type { APIRoute } from 'astro';
import React from 'react';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';
import { calculateDetailedRAB } from '../../utils/rab-formula';
// RABPdfDocument di-import secara dinamis di dalam handler untuk mencegah
// @react-pdf/renderer dievaluasi saat cold-start serverless function Vercel.

export const prerender = false; // Must be rendered server-side dynamically

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { 
      clientName = 'Klien PT. DJC kontraktor', 
      projectLocation = 'Indonesia', 
      projectArea = 0, 
      items = [], 
      taxRatePercent = 0, 
      profitRatePercent = 0 
    } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Tidak ada item pekerjaan yang dipilih.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 1. Fetch live prices from Keystatic
    const reader = createReader(process.cwd(), keystaticConfig);
    const rawMaterials = await reader.collections.hargaBahan.all();
    const rawWages = await reader.collections.hargaUpah.all();
    const rawAHSP = await reader.collections.ahspItem.all();

    // Map data
    const materialsRecord: Record<string, any> = {};
    rawMaterials.forEach((m) => {
      materialsRecord[m.slug] = { slug: m.slug, ...m.entry };
    });

    const wagesRecord: Record<string, any> = {};
    rawWages.forEach((w) => {
      wagesRecord[w.slug] = { slug: w.slug, ...w.entry };
    });

    const ahspRecord: Record<string, any> = {};
    rawAHSP.forEach((a) => {
      ahspRecord[a.slug] = { slug: a.slug, ...a.entry };
    });

    // 2. Perform detailed calculation
    const calculatorResults = calculateDetailedRAB(
      items,
      ahspRecord,
      materialsRecord,
      wagesRecord,
      taxRatePercent,
      profitRatePercent
    );

    // 3. Render PDF document to blob — dynamic import agar tidak crash serverless bundle
    const { pdf } = await import('@react-pdf/renderer');
    const { RABPdfDocument } = await import('../../components/RABPdfDocument');
    const element = React.createElement(RABPdfDocument, {
      clientName,
      projectLocation,
      projectArea,
      calculatorResults
    });

    const blob = await pdf(element).toBlob();
    const arrayBuffer = await blob.arrayBuffer();

    // 4. Return as PDF binary
    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="RAB_PT_DJC_kontraktor_${clientName.replace(/\s+/g, '_')}.pdf"`,
        'Content-Length': arrayBuffer.byteLength.toString(),
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    });

  } catch (err: any) {
    console.error('PDF Generation API Error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Gagal menghasilkan dokumen PDF.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
