export async function onRequestGet({ request, env }) {
  try {
    const URL = env.NEXT_PUBLIC_SUPABASE_URL;
    const SERVICE = env.SUPABASE_SERVICE_ROLE;
    if (!URL) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
    if (!SERVICE) throw new Error("Missing SUPABASE_SERVICE_ROLE");

    const { searchParams } = new URL(request.url);
    const table = (searchParams.get("table") || "").trim();

    const base = URL.replace(/\/+$/, "");
    const info = { ok: true, hasUrl: !!URL, hasService: !!SERVICE };

    if (table) {
      const headers = {
        apikey: SERVICE,
        Authorization: `Bearer ${SERVICE}`,
        "Content-Type": "application/json",
      };
      const resp = await fetch(
        `${base}/rest/v1/${encodeURIComponent(table)}?select=*&limit=1`,
        { method: "GET", headers }
      );

      if (!resp.ok) {
        const text = await resp.text();
        info.sample = { error: `HTTP ${resp.status}`, body: text.slice(0, 300) };
      } else {
        const data = await resp.json();
        info.sample = { rows: Array.isArray(data) ? data.length : 0 };
      }
    }

    return new Response(JSON.stringify(info), {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err?.message || err) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
