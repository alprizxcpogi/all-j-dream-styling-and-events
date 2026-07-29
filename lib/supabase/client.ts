import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

/**
 * Returns a Supabase server client only when env vars are configured.
 * Until then, callers should treat `null` as "storage not wired up yet"
 * rather than an error — see app/api/inquiry/route.ts for the fallback path.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  if (!cachedClient) {
    cachedClient = createClient(url, serviceKey, {
      auth: { persistSession: false },
    });
  }

  return cachedClient;
}
