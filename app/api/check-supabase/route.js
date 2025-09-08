export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET() {
  const { env } = getRequestContext();
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    return new Response(JSON.stringify({
      ok: false,
      error: 'Missing env',
      details: {
        NEXT_PUBLIC_SUPABASE_URL: !!url,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: !!anon,
      }
    }, null, 2), {
      status: 500,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }

  try {
    // Hacemos un HEAD contra /rest/v1/ (endpoint típico) para chequear reachability
    const target = url.replace(/\/+$/, '') + '/rest/v1/';
    const res = await fetch(target, {
      method: 'HEAD',
      headers: { apikey: anon, Authorization: `Bearer ${anon}` }
    });

    return new Response(JSON.stringify({
      ok: res.ok,
      status: res.status,
      statusText: res.statusText
    }, null, 2), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return new Response(JSON.stringify({
      ok: false,
      error: 'Fetch failed',
      message: String(e)
    }, null, 2), {
      status: 500,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }
}
