export const config = { runtime: 'edge' };

export default async function handler() {
  return new Response(
    JSON.stringify({
      url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      anon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      service: !!process.env.SUPABASE_SERVICE_ROLE,
    }),
    { headers: { 'content-type': 'application/json' } }
  );
}
