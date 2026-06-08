import { useState } from 'react'

type Place = {
  place_id: string;
  name: string;
  formatted_address: string;
};

function App()  {
  const [category, setCategory] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const categories = [
    { id: "food_bank", name: "Food Bank", description: "Food Banks provide food to those in need." },
    { id: "shelter", name: "Shelter", description: "Shelters provide housing to those in need." },
    { id: "job_center", name: "Job Center", description: "Job Centers provide job training and employment services." },
    { id: "medical_center", name: "Medical Center", description: "Medical Centers provide medical services to those in need." },
  ]

  async function handleSearch() {
    if  (!category) return;

    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
    const res = await fetch(`${apiUrl}/api/places?category=${category}`);
    const data = await res.json();
    setPlaces(Array.isArray(data) ? data : []);
    setHasSearched(true);
    setLoading(false);
  }
 
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-satoshi">

      <header className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-center py-12 px-4 shrink-0">
        <h1 className="text-4xl font-bold">FinderDallas</h1>
        <p className="mt-2 text-lg">Find community resources in Dallas Metroplex</p>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">

        <h2 className="text-2xl font-bold text-center text-gray-800">
          What are you looking for?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setCategory(cat.id)
                setHasSearched(false)
                setPlaces([])
              }}
              className={`text-left p-6 rounded-xl border-2 bg-white shadow-sm hover:shadow-md transition-shadow ${
                category === cat.id
                  ? "border-emerald-600 ring-2 ring-emerald-300"
                  : "border-gray-200"
              }`}
            >
              <h3 className="text-lg font-bold text-emerald-700">{cat.name}</h3>
              <p className="text-gray-600 mt-2">{cat.description}</p>
            </button>
          ))}
        </div>

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

        <section className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-center text-gray-800">Results</h3>

          {/* Outer shell: fixed size, never grows */}
          <div className="w-full h-96 shrink-0 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* Inner: scroll only here */}
            <div className="h-full overflow-y-auto p-4 flex flex-col">
              {loading && (
                <p className="text-center text-gray-500 m-auto">Searching...</p>
              )}

              {!loading && !hasSearched && (
                <p className="text-center text-gray-500 m-auto">Please select a category above to continue.</p>
              )}

              {!loading && hasSearched && places.length === 0 && (
                <p className="text-center text-gray-500 m-auto">No results found. Try a different category.</p>
              )}

              {!loading && hasSearched && places.length > 0 && places.map((place) => (
                <div
                  key={place.place_id}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-3 last:mb-0"
                >
                  <h4 className="font-bold text-gray-800">{place.name}</h4>
                  <p className="text-gray-600 mt-1 text-sm">{place.formatted_address}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-center text-sm py-4 px-4 shrink-0">
        Data © OpenStreetMap contributors
      </footer>

    </div>
  )
}

export default App
