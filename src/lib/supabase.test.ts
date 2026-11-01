import { afterEach, describe, expect, it } from "vitest";
import { getSupabase, resetSupabaseForTests } from "./supabase";

const URL_ENV = "FINDER_DALLAS_API_URL";
const KEY_ENV = "SUPABASE_ANON_KEY";

const saved = {
  url: process.env[URL_ENV],
  key: process.env[KEY_ENV],
};

afterEach(() => {
  if (saved.url === undefined) delete process.env[URL_ENV];
  else process.env[URL_ENV] = saved.url;
  if (saved.key === undefined) delete process.env[KEY_ENV];
  else process.env[KEY_ENV] = saved.key;
  resetSupabaseForTests();
});

describe("getSupabase", () => {
  it("names each missing env var", () => {
    delete process.env[URL_ENV];
    delete process.env[KEY_ENV];
    resetSupabaseForTests();

    expect(() => getSupabase()).toThrow(/FINDER_DALLAS_API_URL and SUPABASE_ANON_KEY/);
  });

  it("names only the key when the URL is set", () => {
    process.env[URL_ENV] = "https://example.supabase.co";
    delete process.env[KEY_ENV];
    resetSupabaseForTests();

    expect(() => getSupabase()).toThrow(/SUPABASE_ANON_KEY/);
    expect(() => getSupabase()).not.toThrow(/FINDER_DALLAS_API_URL/);
  });
});
