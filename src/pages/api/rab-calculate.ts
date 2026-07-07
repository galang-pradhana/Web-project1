import type { APIRoute } from 'astro';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';
import { calculateDetailedRAB } from '../../utils/rab-formula';

export const prerender = false; // Enable dynamic server-side rendering for this route

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { items, taxRatePercent = 0, profitRatePercent = 0 } = body;

    if (!items || !Array.isArray(items)) {
      return new Response(JSON.stringify({ error: 'Missing or invalid items array.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Initialize Keystatic reader to fetch current rates
    const reader = createReader(process.cwd(), keystaticConfig);

    // Fetch all materials, wages, and AHSP items
    const rawMaterials = await reader.collections.hargaBahan.all();
    const rawWages = await reader.collections.hargaUpah.all();
    const rawAHSP = await reader.collections.ahspItem.all();

    // Map arrays to records for fast lookup
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

    // Run the calculation
    const results = calculateDetailedRAB(
      items,
      ahspRecord,
      materialsRecord,
      wagesRecord,
      taxRatePercent,
      profitRatePercent
    );

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
      }
    });

  } catch (err: any) {
    console.error('RAB Calculation API Error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Server error occurred during calculation.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
