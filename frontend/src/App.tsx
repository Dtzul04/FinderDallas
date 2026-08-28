import { useState } from "react";
import type { Place, CategoryId } from "./types";
import { fetchPlaces } from "./lib/fetchPlaces";
import { categories } from "./constants/categories";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CategoryGrid } from "./components/CategoryGrid";
import { ResultsPanel } from "./components/ResultsPanel";

function App() {
  const [category, setCategory] = useState<CategoryId | "">("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleCategorySelect(id: CategoryId) {
    setCategory(id);
    setHasSearched(false);
    setPlaces([]);
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-satoshi">
      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          What are you looking for?
        </h2>

        <CategoryGrid
          categories={categories}
          selectedCategory={category}
          onSelect={handleCategorySelect}
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
          places={places}
          loading={loading}
          hasSearched={hasSearched}
          error={error}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
