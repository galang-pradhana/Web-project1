import type { APIRoute } from 'astro';
import { supabaseFetch } from '../../utils/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { 
      nama = '',
      whatsapp = '',
      email = '',
      calculationId = null,
      sumberMode = 'quick'
    } = body;

    if (!nama || !whatsapp) {
      return new Response(JSON.stringify({ error: 'Nama dan nomor WhatsApp wajib diisi.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Persiapkan payload sesuai dengan skema tabel rab_leads
    const payload = {
      nama: nama,
      whatsapp: whatsapp,
      email: email || null,
      calculation_id: calculationId || null,
      sumber_mode: sumberMode
    };

    let result = null;
    try {
      result = await supabaseFetch('rab_leads', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (dbErr: any) {
      console.error('[Supabase Error] Gagal menyimpan lead:', dbErr.message);
    }

    // Jika berhasil atau gagal (dengan fallback) tetap kembalikan status success agar flow user tidak terhenti
    const isSuccess = !!(result && Array.isArray(result) && result.length > 0);
    return new Response(JSON.stringify({ 
      success: true, 
      databaseSaved: isSuccess,
      warning: isSuccess ? undefined : 'Supabase database insert skipped or failed'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('API Error /api/rab-lead:', err);
    return new Response(JSON.stringify({ error: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
