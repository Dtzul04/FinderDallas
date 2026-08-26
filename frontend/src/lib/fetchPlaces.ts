import type { CategoryId, Place } from "../types";

export async function fetchPlaces(category: CategoryId): Promise<Place[]> {
    const apiUrl = import.meta.env.VITE_API_URL || "";
    const res = await fetch(`${apiUrl}/api/places?category=${category}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
}