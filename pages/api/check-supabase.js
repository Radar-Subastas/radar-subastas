export const config = { runtime: 'edge' };
import { createClient } from '@supabase/supabase-js';

export default async function handler(req) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const service = process.env.SUPABASE_SERVICE_ROLE;

    if (!url) throw new Error("Missing SUPABASE URL");
    if (!anon) throw new Error("Missing ANON KEY");
    if (!service) throw new Error("Missing SERVICE ROLE");

    const supabase = createClient(url, service);

    const { searchParams } = new URL(req.url);
    const table = searchParams.get('table');
    let sample = null;
    if (table) {
      const { data, error } = await supabase.from(table).select('*').limit(1);
      if (error) throw error;
      sample = { rows: data?.length || 0 };
    }

    return new Response(JSON.stringify({
      ok: true,
      hasUrl: !!url,
      hasAnon: !!anon,
      hasService: !!service,
      sample
    }), { headers: { 'content-type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err.message || err) }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
}
