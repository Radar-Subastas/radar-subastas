import { getSupabaseServer } from '../../lib/supabaseServer';

export default async function handler(req, res) {
  const hasService = !!process.env.SUPABASE_SERVICE_ROLE;
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const table = (req.query.table || '').toString();

  if (!hasUrl) {
    return res.status(200).json({ ok: false, reason: 'Falta NEXT_PUBLIC_SUPABASE_URL' });
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

  return res.status(200).json(info);
}
