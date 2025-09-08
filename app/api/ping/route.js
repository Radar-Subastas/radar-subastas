export const runtime = 'edge';

export async function GET() {
  // No dependencias, no env: debe responder siempre.
  return new Response(JSON.stringify({ ok: true, pong: 'pong' }), {
    status: 200,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
