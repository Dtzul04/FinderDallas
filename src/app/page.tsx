"use client";

import { useState } from "react";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ResultsPanel } from "@/components/ResultsPanel";
import { categories } from "@/constants/categories";
import { fetchPlaces } from "@/lib/fetchPlaces";
import type { CategoryId, Place } from "@/types";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [category, setCategory] = useState<CategoryId | "">("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  function handleCategorySelect(id: CategoryId) {
    setCategory(id);
    setHasSearched(false);
    setPlaces([]);
    setSearchText("");
    setError(null);
  }

  async function handleSearch() {
    if (!category) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchPlaces(category);
      setPlaces(data);
    } catch {
      setPlaces([]);
      setError("Failed to fetch places. Please try again.");
    } finally {
      setHasSearched(true);
      setLoading(false);
    }
  }

  const query = searchText.trim().toLowerCase();

  const filteredPlaces = 
    query === ""
      ? places
      : places.filter(
          (place) => 
            place.name.toLowerCase().includes(query) || 
            place.formatted_address.toLowerCase().includes(query),
          );

  return (
    <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        What are you looking for?
      </h2>

      <CategoryGrid
        categories={categories}
        selectedCategory={category}
        onSelect={handleCategorySelect}
      />

      <SearchBar
        value={searchText}
        onChange={setSearchText}
      />
      
      <div className="text-center">
        <button
          type="button"
          onClick={handleSearch}
          disabled={!category || loading}
          className="px-8 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <ResultsPanel
        places={filteredPlaces}
        loading={loading}
        hasSearched={hasSearched}
        error={error}
      />
    </main>
  );
}
