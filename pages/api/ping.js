export const config = { runtime: 'edge' };

export default function handler() {
  return new Response("pong", { headers: { "content-type": "text/plain" } });
}
