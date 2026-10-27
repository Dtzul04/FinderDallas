import type { Place } from "@/types";

// loading / empty / error / list states
type ResultsPanelProps = {
  places: Place[];
  totalCount: number; // count before the filter text is applied
  loading: boolean;
  hasSearched: boolean;
  error: string | null;
};

function getStatusMessage(
  places: Place[],
  totalCount: number,
  loading: boolean,
  hasSearched: boolean,
  error: string | null,
): string {
  if (loading) return "Searching for resources.";
  if (error) return error;
  if (!hasSearched) {
    return "Choose a category and tap Search to see resources from the database.";
  }
  if (totalCount === 0) {
    return "No resources found for this category yet. Try another category.";
  }
  if (places.length === 0) {
    return "No matches for your filter. Try different words or clear it.";
  }
  const noun = places.length === 1 ? "place" : "places";
  if (places.length < totalCount) {
    return `Showing ${places.length} of ${totalCount} ${noun}.`;
  }
  return `${places.length} ${noun} found.`;
}

export function ResultsPanel({
  places,
  totalCount,
  loading,
  hasSearched,
  error,
}: ResultsPanelProps) {
  const showCount = hasSearched && !loading && !error && places.length > 0;
  const statusMessage = getStatusMessage(
    places,
    totalCount,
    loading,
    hasSearched,
    error,
  );

  return (
    <section
      className="flex flex-col gap-3"
      aria-labelledby="results-heading"
      aria-busy={loading}
    >
      <div className="flex items-center justify-between gap-2 px-1">
        <h3 id="results-heading" className="text-lg font-semibold text-slate-800">
          Results
        </h3>
        {showCount && (
          <span
            className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-medium text-emerald-800"
            aria-hidden="true"
          >
            {places.length} {places.length === 1 ? "place" : "places"}
          </span>
        )}
      </div>

      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </p>

      <div className="h-96 w-full shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 shadow-inner">
        <div className="flex h-full flex-col overflow-y-auto p-4" aria-live="polite">
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
            <p
              role="alert"
              className="m-auto text-center text-sm font-medium text-red-600"
            >
              {error}
            </p>
          )}

          {/* category has nothing in the database */}
          {!loading && hasSearched && !error && totalCount === 0 && (
            <p className="m-auto max-w-xs text-center text-sm text-slate-500">
              No resources found for this category yet. Try another category.
            </p>
          )}

          {/* category has results, but the filter text hides them all */}
          {!loading &&
            hasSearched &&
            !error &&
            totalCount > 0 &&
            places.length === 0 && (
              <p className="m-auto max-w-xs text-center text-sm text-slate-500">
                No matches for your filter. Try different words or clear it.
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
