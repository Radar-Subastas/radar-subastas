export const runtime = 'edge';

function readEnv(k) {
  if (globalThis?.__ENV__ && typeof globalThis.__ENV__[k] !== 'undefined') return globalThis.__ENV__[k];
  if (typeof process !== 'undefined' && process.env && typeof process.env[k] !== 'undefined') return process.env[k];
  return undefined;
}

export async function GET() {
  const url = !!readEnv('NEXT_PUBLIC_SUPABASE_URL');
  const anon = !!readEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  const service = !!readEnv('SUPABASE_SERVICE_ROLE');

  return new Response(JSON.stringify({ ok: true, url, anon, service }), {
    headers: { 'content-type': 'application/json' },
  });
}
