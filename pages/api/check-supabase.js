export const config = { runtime: 'edge' };

import { getSupabaseServer } from '../../lib/supabaseServer';

export default async function handler(req) {
  const hasService = !!process.env.SUPABASE_SERVICE_ROLE;
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const { searchParams } = new URL(req.url);
  const table = (searchParams.get('table') || '').toString();

  if (!hasUrl) {
    return new Response(JSON.stringify({ ok: false, reason: 'Falta NEXT_PUBLIC_SUPABASE_URL' }), {
      headers: { 'content-type': 'application/json' }
    });
  }
  const info = { ok: true, hasService, hasUrl };

  if (table && hasService) {
    try {
      const supabase = getSupabaseServer();
      const { data, error } = await supabase.from(table).select('*').limit(1);
      info.sample = error ? { error: error.message } : { rows: data?.length || 0 };
    } catch (e) {
      info.sample = { error: String(e) };
    }
  }
  return new Response(JSON.stringify(info), {
    headers: { 'content-type': 'application/json' }
  });
}
