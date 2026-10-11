// needs useState and click handlers
"use client";

import { useState } from "react";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ResultsPanel } from "@/components/ResultsPanel";
import { categories } from "@/constants/categories";
import { fetchPlaces } from "@/lib/fetchPlaces";
import type { CategoryId, Place } from "@/types";
import SearchBar from "@/components/SearchBar";
import CategorySearch from "@/components/CategorySearch";

export default function Home() {
  const [category, setCategory] = useState<CategoryId | "">("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [categoryFilterText, setCategoryFilterText] = useState(""); // text typed in the category search box

  // new category = reset old results
  function handleCategorySelect(id: CategoryId) {
    setCategory(id);
    setHasSearched(false);
    setPlaces([]);
    setSearchText("");
    setError(null);
  }

  // one API call per category search
  async function handleSearch() {
    if (!category) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchPlaces(category);
      setPlaces(data);
    } catch (err) {
      // show the API's message if we have one
      setPlaces([]);
      setError(
        err instanceof Error ? err.message : "Failed to fetch places. Please try again.",
      );
    } finally {
      setHasSearched(true);
      setLoading(false);
    }
  }

  // filter on the client — no extra trip to Supabase
  const query = searchText.trim().toLowerCase();

  const filteredPlaces =
    query === ""
      ? places
      : places.filter(
          (place) =>
            place.name.toLowerCase().includes(query) ||
            place.formatted_address.toLowerCase().includes(query),
        );

  // filter category cards by name or description; empty text matches all
  const categoryQuery = categoryFilterText.trim().toLowerCase();

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(categoryQuery) ||
      cat.description.toLowerCase().includes(categoryQuery),
  );

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">
          What are you looking for?
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Select a category, then search our database.
        </p>

        <div className="mt-6">
          <CategorySearch
            value={categoryFilterText}
            onChange={setCategoryFilterText}
          />
        </div>

        <div className="mt-6">
          {filteredCategories.length > 0 ? (
            <CategoryGrid
              categories={filteredCategories} // only cards matching the search box
              selectedCategory={category}
              onSelect={handleCategorySelect}
              disabled={loading} // no switching categories mid-search
            />
          ) : (
            <p className="py-6 text-center text-sm text-slate-500">
              No categories match your search.
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <button
            type="button"
            onClick={handleSearch}
            disabled={!category || loading}
            className="w-full rounded-xl bg-emerald-600 px-8 py-3.5 text-center font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:self-center"
          >
            {loading ? "Searching..." : "Search resources"}
          </button>
        </div>
      </div>

      {/* show panel while loading or after a search */}
      { (loading || hasSearched) && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <SearchBar value={searchText} onChange={setSearchText} />
          <div className="mt-6">
            <ResultsPanel
              places={filteredPlaces}
              totalCount={places.length} // lets the panel tell "no data" from "no filter matches"
              loading={loading}
              hasSearched={hasSearched}
              error={error}
            />
          </div>
        </div>
      )}
    </main>
  );
}
