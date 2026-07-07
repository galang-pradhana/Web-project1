import type { APIRoute } from 'astro';
import { supabaseFetch } from '../../utils/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { 
      jenisPekerjaan = 'Kustom',
      luasBangunan = 0,
      lokasi = '',
      paketSlug = '',
      items = [],
      profitRate = 10,
      taxRate = 11,
      subtotal = 0,
      totalCost = 0
    } = body;

    // Persiapkan payload sesuai dengan skema tabel rab_calculations
    const payload = {
      jenis_pekerjaan: jenisPekerjaan,
      luas_bangunan: luasBangunan,
      lokasi: lokasi,
      paket_slug: paketSlug,
      items: items, // disimpan sebagai JSONB
      profit_rate: profitRate,
      tax_rate: taxRate,
      subtotal: subtotal,
      total_cost: totalCost
    };

    let result = null;
    try {
      result = await supabaseFetch('rab_calculations', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (dbErr: any) {
      console.error('[Supabase Error] Gagal menyimpan kalkulasi:', dbErr.message);
    }

    if (result && Array.isArray(result) && result.length > 0) {
      return new Response(JSON.stringify({ id: result[0].id, success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Fallback jika Supabase belum terkonfigurasi atau gagal
      const mockId = crypto.randomUUID();
      console.warn('[Supabase Fallback] Menggunakan mock ID karena kegagalan database:', mockId);
      return new Response(JSON.stringify({ 
        id: mockId, 
        success: true, 
        warning: 'Supabase credentials missing or database insert failed.' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (err: any) {
    console.error('API Error /api/rab-save:', err);
    return new Response(JSON.stringify({ error: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
