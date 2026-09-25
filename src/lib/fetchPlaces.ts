import type { CategoryId, Place } from "@/types";

// browser calls our Next.js API, not Supabase directly
export async function fetchPlaces(category: CategoryId): Promise<Place[]> {
  const url = `/api/places?category=${category}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Request failed");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
