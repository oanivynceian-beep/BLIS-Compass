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

// Create client with custom auth config to prevent Navigator Lock timeouts in iframes
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'lis-compass-auth-token',
    // Provide a custom no-op lock to bypass the Navigator LockManager entirely
    // The signature for LockFunc is (name, acquireTimeout, acquire)
    lock: async (_name: string, _acquireTimeout: number, acquire: () => Promise<any>) => {
      return await acquire();
    },
  }
});
