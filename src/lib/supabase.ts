import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const URL_ENV = "FINDER_DALLAS_API_URL";
const KEY_ENV = "SUPABASE_ANON_KEY";

// Created on first use so `next build` can run without secrets.
let supabase: SupabaseClient | null = null;

function missingEnvMessage(missing: string[]): string {
  return `Missing ${missing.join(" and ")}. Add ${missing.length === 1 ? "it" : "them"} to .env.local for local dev, or to your host's environment variables when deploying.`;
}

export function getSupabase(): SupabaseClient {
  if (supabase) return supabase;

  const url = process.env[URL_ENV];
  const key = process.env[KEY_ENV];
  const missing = [
    !url ? URL_ENV : null,
    !key ? KEY_ENV : null,
  ].filter((name): name is string => name !== null);

  if (missing.length > 0) {
    throw new Error(missingEnvMessage(missing));
  }

  supabase = createClient(url!, key!);
  return supabase;
}

// Tests clear this so a missing-env check is not skipped after a client was cached.
export function resetSupabaseForTests(): void {
  supabase = null;
}
