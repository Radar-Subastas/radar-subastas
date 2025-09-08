import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const service = process.env.SUPABASE_SERVICE_ROLE;

if (!url || !service) {
  console.warn('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE');
}

export function getSupabaseServer() {
  return createClient(url || '', service || '');
}
