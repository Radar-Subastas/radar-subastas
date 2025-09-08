# Radar Subastas + Supabase (demo)

Pasos para usar variables:

1) En Cloudflare Pages → Settings → Environment Variables (Production y Preview):
   - NEXT_PUBLIC_SUPABASE_URL = https://XXXX.supabase.co
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = (anon key)
   - SUPABASE_SERVICE_ROLE = (service role key)  # solo server-side

2) Despliega. Luego prueba:
   - /supabase-test  → muestra si las variables están disponibles en el navegador.
   - /api/check-supabase → devuelve JSON con estado (no toca la base). Puedes pasar ?table=nombre para probar un SELECT si existe.
