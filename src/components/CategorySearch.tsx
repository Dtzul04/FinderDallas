// parent passes value + setCategoryFilterText
type CategorySearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CategorySearch({ value, onChange }: CategorySearchProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-slate-700">
        Search categories
      </span>
      <input
        type="search"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search categories..."
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-500 transition-shadow focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
      />
    </label>
  );
}
