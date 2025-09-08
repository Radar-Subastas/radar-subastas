export default function SupabaseTest() {
  const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasAnon = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return (
    <main style={{maxWidth: 680, margin: '60px auto', fontFamily: 'system-ui'}}>
      <h1>🔌 Test de variables Supabase</h1>
      <ul>
        <li>NEXT_PUBLIC_SUPABASE_URL: <b>{hasUrl ? 'OK' : 'NO'}</b></li>
        <li>NEXT_PUBLIC_SUPABASE_ANON_KEY: <b>{hasAnon ? 'OK' : 'NO'}</b></li>
      </ul>
      <p>
        Si ambas son <b>OK</b>, el cliente de navegador está listo.
      </p>
      <p>Prueba también la ruta <code>/api/check-supabase</code> (server) para validar la clave de servicio.</p>
    </main>
  );
}
