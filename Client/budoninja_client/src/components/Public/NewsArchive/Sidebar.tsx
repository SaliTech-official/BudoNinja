import { useState, useEffect } from "react";
import { Input } from "../../UI/Input";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useNewsFilters } from "../../../hooks/useNewsFilters";
import { useNewsCategories } from "../../../hooks/queries/useNewsCategories";
import type { Category } from "../../../types/news";

export function Sidebar() {
  const { category, search, setCategory, setSearch, clearFilters, hasFilters } =
    useNewsFilters();

  const { data: categoriesData, isLoading: categoriesLoading } =
    useNewsCategories();

  const categories = categoriesData ?? [];

  // local state برای input جستجو (debounced)
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== search) {
        setSearch(searchInput);
      }
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const handleCategoryClick = (name: string) => {
    if (category === name) {
      setCategory("");
    } else {
      setCategory(name);
    }
  };

  return (
    <aside className="w-full md:w-80 flex-shrink-0 md:sticky md:top-28">
      <div className="space-y-8">
        {/* Search */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">جستجو</h3>
          <div className="relative">
            <Input
              placeholder="جستجو در عنوان و متن اخبار..."
              className="pr-10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            دسته‌بندی‌ها
          </h3>

          {categoriesLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
            </div>
          ) : categories.length === 0 ? (
            <p className="text-sm text-neutral-500 py-4">
              دسته‌بندی وجود ندارد
            </p>
          ) : (
            <ul>
              {categories.map((cat: Category) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat.name)}
                    className={cn(
                      "w-full flex justify-between group items-center text-sm py-3 border-b border-neutral-200 transition-colors",
                      category === cat.name
                        ? "text-primary-600 font-semibold"
                        : "text-neutral-600 hover:text-primary-600"
                    )}
                  >
                    <span>{cat.name}</span>
                    {category === cat.name && (
                      <span className="text-xs text-primary-500">✓</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Clear filters */}
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="w-full flex items-center justify-center gap-2 text-sm text-danger-500 hover:text-danger-600 py-2"
          >
            <X size={16} />
            <span>حذف همه فیلترها</span>
          </button>
        )}
      </div>
    </aside>
  );
}
