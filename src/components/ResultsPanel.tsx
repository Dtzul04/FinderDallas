import type { Place } from "@/types";

type ResultsPanelProps = {
  places: Place[];
  loading: boolean;
  hasSearched: boolean;
  error: string | null;
};

export function ResultsPanel({
  places,
  loading,
  hasSearched,
  error,
}: ResultsPanelProps) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-lg font-bold text-center text-gray-800">Results</h3>

      <div className="w-full h-96 shrink-0 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="h-full overflow-y-auto p-4 flex flex-col">
          {loading && (
            <p className="text-center text-gray-500 m-auto">Searching...</p>
          )}

          {!loading && !hasSearched && (
            <p className="text-center text-gray-500 m-auto">
              Please select a category above to continue.
            </p>
          )}

          {!loading && error && (
            <p className="text-center text-red-500 m-auto">{error}</p>
          )}

          {!loading && hasSearched && !error && places.length === 0 && (
            <p className="text-center text-gray-500 m-auto">
              No results found. Try a different category.
            </p>
          )}

          {!loading &&
            hasSearched &&
            !error &&
            places.length > 0 &&
            places.map((place) => (
              <div
                key={place.place_id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-3 last:mb-0"
              >
                <h4 className="font-bold text-gray-800">{place.name}</h4>
                <p className="text-gray-600 mt-1 text-sm">
                  {place.formatted_address}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
