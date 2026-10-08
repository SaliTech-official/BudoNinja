/**
 * مدیریت state تب‌های فیلتر
 */

import { useSearchParams } from "react-router-dom";

export type EventTab = "all" | "open" | "closed";

export function useEventFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const tab: EventTab = (searchParams.get("tab") as EventTab) || "all";

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", String(newPage));
    }
    setSearchParams(params);
  };

  const setTab = (newTab: EventTab) => {
    const params = new URLSearchParams(searchParams);
    if (newTab === "all") {
      params.delete("tab");
    } else {
      params.set("tab", newTab);
    }
    params.delete("page"); // reset page
    setSearchParams(params);
  };

  return { page, tab, setPage, setTab };
}
