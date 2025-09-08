export const config = { runtime: 'edge' };

// Acceso seguro a env en Edge (evita ReferenceError si process no existe)
const readEnv = (k) =>
  (typeof process !== 'undefined' &&
    process.env &&
    typeof process.env[k] !== 'undefined'
      ? process.env[k]
      : undefined);

export default async function handler() {
  const url = !!readEnv('NEXT_PUBLIC_SUPABASE_URL');
  const anon = !!readEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  const service = !!readEnv('SUPABASE_SERVICE_ROLE');

  return new Response(
    JSON.stringify({ ok: true, url, anon, service }),
    { headers: { 'content-type': 'application/json' } }
  );
}
