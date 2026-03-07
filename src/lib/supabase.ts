import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseUrl = 'https://ngkpxpjjcjinltyxeomg.supabase.co';

if (rawUrl && rawUrl !== 'undefined' && rawUrl !== 'null') {
  if (rawUrl.startsWith('http')) {
    supabaseUrl = rawUrl;
  } else if (rawUrl.includes('.supabase.co')) {
    // If it's just the domain, prepend https://
    supabaseUrl = `https://${rawUrl}`;
    console.warn('Supabase URL missing protocol. Prepending https://');
  } else {
    console.warn('Invalid Supabase URL provided in environment variables. Using fallback.');
  }
}

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_fpbr8oyt2xAQy_3n0vx3eA_Mh7au0UX';

if (!rawUrl) {
  console.warn('Supabase URL missing from environment variables. Using fallback project.');
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
