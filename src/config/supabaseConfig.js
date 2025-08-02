import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

//console.log('Supabase URL:', supabaseUrl);

if (!supabaseUrl || !supabaseKey || !serviceRoleKey) {
  throw new Error("Faltan variables de entorno de Supabase");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);