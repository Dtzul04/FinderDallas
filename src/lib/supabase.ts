import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazy client so `next build` works in CI without secrets (env only needed at runtime).
let supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (supabase) return supabase;

  const url = process.env.FINDER_DALLAS_API_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase env vars");
  }

  supabase = createClient(url, key);
  return supabase;
}
