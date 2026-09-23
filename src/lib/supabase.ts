import { createClient } from "@supabase/supabase-js";

const url = process.env.FINDER_DALLAS_API_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
    throw new Error("Missing Supabase nev vars");
}

export const supabase = createClient(url, key);