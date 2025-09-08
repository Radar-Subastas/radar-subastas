export const runtime = 'edge';

// ⚠️ Import propio de next-on-pages para acceder a env en Cloudflare Pages
import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET() {
  const { env } = getRequestContext();

  // Solo devolvemos “presencia” para no exponer secretos.
  const result = {
    NEXT_PUBLIC_SUPABASE_URL: !!env.NEXT_PUBLIC_SUPABASE_URL ? 'OK' : 'MISSING',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'OK' : 'MISSING',
    SUPABASE_SERVICE_ROLE: !!env.SUPABASE_SERVICE_ROLE ? 'OK' : 'MISSING',
  };

  return new Response(JSON.stringify(result, null, 2), {
    status: 200,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
