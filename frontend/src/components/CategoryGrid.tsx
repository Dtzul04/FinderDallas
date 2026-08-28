import type { Category, CategoryId } from "../types";

type CategoryGridProps = {
  categories: Category[];
  selectedCategory: CategoryId | "";
  onSelect: (id: CategoryId) => void;
};

export function CategoryGrid({ categories, selectedCategory, onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelect(cat.id)}
          className={`text-left p-6 rounded-xl border-2 bg-white shadow-sm hover:shadow-md transition-shadow ${
            selectedCategory === cat.id
              ? "border-emerald-600 ring-2 ring-emerald-300"
              : "border-gray-200"
          }`}
        >
          <h3 className="text-lg font-bold text-emerald-700">{cat.name}</h3>
          <p className="text-gray-600 mt-2">{cat.description}</p>
        </button>
      ))}
    </div>
  );
}
