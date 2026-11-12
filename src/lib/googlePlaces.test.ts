import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { searchPlaces } from "./googlePlaces";

const KEY_ENV = "GOOGLE_PLACES_API_KEY";
const savedKey = process.env[KEY_ENV];

afterEach(() => {
  // put the real env key back after each test
  if (savedKey === undefined) delete process.env[KEY_ENV];
  else process.env[KEY_ENV] = savedKey;
  vi.unstubAllGlobals();
});

describe("searchPlaces", () => {
  beforeEach(() => {
    process.env[KEY_ENV] = "test-key";
  });

  // successful lookup (mocked Google response)
  it("maps Google results into Place objects", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({
          places: [
            {
              id: "place-1",
              displayName: { text: "Dallas Shelter" },
              formattedAddress: "123 Main St, Dallas, TX",
            },
          ],
        }),
      ),
    );

    await expect(searchPlaces("shelter")).resolves.toEqual([
      {
        place_id: "place-1",
        name: "Dallas Shelter",
        formatted_address: "123 Main St, Dallas, TX",
      },
    ]);
  });

  // API configuration failure
  it("throws when the API key is missing", async () => {
    delete process.env[KEY_ENV];

    await expect(searchPlaces("shelter")).rejects.toThrow(/GOOGLE_PLACES_API_KEY/);
  });

  // API failure from Google
  it("throws when Google returns an error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({ error: { message: "API key invalid" } }, { status: 403 }),
      ),
    );

    await expect(searchPlaces("food_bank")).rejects.toThrow(/Google Places error \(403\)/);
  });
});
