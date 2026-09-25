// top banner
export function Header() {
  return (
    <header className="relative shrink-0 overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 text-white shadow-md">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 py-10 text-center sm:py-12">
        <p className="text-sm font-medium uppercase tracking-widest text-emerald-100">
          Dallas Metroplex
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          FinderDallas
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-emerald-50/95 sm:text-lg">
          Find food banks, shelters, job centers, and medical resources near you.
        </p>
      </div>
    </header>
  );
}
