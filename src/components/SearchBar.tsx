// parent passes value + setSearchText
type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-slate-700">
        Filter results
      </span>
      <input
        type="search"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or address..."
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 transition-shadow focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
      />
    </label>
  );
}
