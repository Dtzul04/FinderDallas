import type { Place } from "@/types";

// loading / empty / error / list states
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
  const showCount = hasSearched && !loading && !error && places.length > 0;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2 px-1">
        <h3 className="text-lg font-semibold text-slate-800">Results</h3>
        {showCount && (
          <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-medium text-emerald-800">
            {places.length} {places.length === 1 ? "place" : "places"}
          </span>
        )}
      </div>

      <div className="h-96 w-full shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 shadow-inner">
        <div className="flex h-full flex-col overflow-y-auto p-4">
          {loading && (
            <p className="m-auto text-center text-slate-500">Searching...</p>
          )}

          {!loading && !hasSearched && (
            <p className="m-auto max-w-xs text-center text-sm leading-relaxed text-slate-500">
              Choose a category and tap Search to see resources from the
              database.
            </p>
          )}

          {!loading && error && (
            <p className="m-auto text-center text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {!loading && hasSearched && !error && places.length === 0 && (
            <p className="m-auto max-w-xs text-center text-sm text-slate-500">
              No matches. Try another category or clear your filter text.
            </p>
          )}

          {!loading &&
            hasSearched &&
            !error &&
            places.length > 0 &&
            places.map((place) => (
              <article
                key={place.place_id}
                className="mb-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm last:mb-0"
              >
                <h4 className="font-semibold text-slate-900">{place.name}</h4>
                <p className="mt-1.5 text-sm text-slate-600">
                  {place.formatted_address}
                </p>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
