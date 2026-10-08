/**
 * مدیریت state فیلترها و pagination برای صفحه اخبار
 * از URL query params استفاده می‌کنیم که shareable باشه
 */

import { useSearchParams } from "react-router-dom";

export function useNewsFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";
  const search = searchParams.get("q") || "";

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", String(newPage));
    }
    setSearchParams(params);
  };

  const setCategory = (newCategory: string) => {
    const params = new URLSearchParams(searchParams);
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    params.delete("page"); // reset به صفحه اول
    setSearchParams(params);
  };

  const setSearch = (newSearch: string) => {
    const params = new URLSearchParams(searchParams);
    if (newSearch.trim()) {
      params.set("q", newSearch.trim());
    } else {
      params.delete("q");
    }
    params.delete("page");
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasFilters = !!(category || search);

  return {
    page,
    category,
    search,
    setPage,
    setCategory,
    setSearch,
    clearFilters,
    hasFilters,
  };
}
