import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseUrl = (rawUrl && rawUrl.startsWith('http')) 
  ? rawUrl 
  : 'https://ngkpxpjjcjinltyxeomg.supabase.co';

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_fpbr8oyt2xAQy_3n0vx3eA_Mh7au0UX';

if (!rawUrl || !rawUrl.startsWith('http')) {
  console.warn('Supabase URL missing or invalid. Using fallback URL.');
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase Anon Key missing. Using fallback key.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
