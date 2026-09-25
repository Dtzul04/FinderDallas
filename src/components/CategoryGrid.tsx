import type { Category, CategoryId } from "@/types";

// tells page which category was picked
type CategoryGridProps = {
  categories: Category[];
  selectedCategory: CategoryId | "";
  onSelect: (id: CategoryId) => void;
};

export function CategoryGrid({
  categories,
  selectedCategory,
  onSelect,
}: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelect(cat.id)}
          className={`text-left rounded-2xl border-2 bg-white p-5 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md sm:p-6 ${
            selectedCategory === cat.id
              ? "border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-500/20"
              : "border-slate-200"
          }`}
        >
          <h3 className="text-lg font-semibold text-emerald-800">{cat.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {cat.description}
          </p>
        </button>
      ))}
    </div>
  );
}
