import { categorySearchQueries } from "@/constants/categories";
import type { CategoryId, Place } from "@/types";

const KEY_ENV = "GOOGLE_PLACES_API_KEY";
const SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";

// only the fields we map into Place
const FIELD_MASK = "places.id,places.displayName,places.formattedAddress";

type GooglePlace = {
  id?: string;
  formattedAddress?: string;
  displayName?: { text?: string };
};

type GoogleSearchResponse = {
  places?: GooglePlace[];
  error?: { message?: string };
};

function getApiKey(): string {
  const key = process.env[KEY_ENV]?.trim();
  if (!key) {
    throw new Error(
      `Missing ${KEY_ENV}. Add it to .env.local for local dev, or to your host's environment variables when deploying.`,
    );
  }
  return key;
}

// server-side only: call Google Places Text Search and return our Place shape
export async function searchPlaces(category: CategoryId): Promise<Place[]> {
  const apiKey = getApiKey();
  const textQuery = categorySearchQueries[category];

  const response = await fetch(SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify({ textQuery }),
  });

  const data = (await response.json()) as GoogleSearchResponse;

  if (!response.ok) {
    const detail = data.error?.message ?? response.statusText;
    throw new Error(`Google Places error (${response.status}): ${detail}`);
  }

  return (data.places ?? [])
    .filter((place) => place.id && place.displayName?.text && place.formattedAddress)
    .map((place) => ({
      place_id: place.id!,
      name: place.displayName!.text!,
      formatted_address: place.formattedAddress!,
    }));
}
