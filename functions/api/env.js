export async function onRequestGet({ env }) {
  // En Pages Functions, las variables están en env.*
  const url = !!env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = !!env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = !!env.SUPABASE_SERVICE_ROLE;

  return new Response(JSON.stringify({ ok: true, url, anon, service }), {
    headers: { "content-type": "application/json" },
  });
}
