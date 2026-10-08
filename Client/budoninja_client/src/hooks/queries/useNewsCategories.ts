/**
 * گرفتن لیست دسته‌بندی‌های خبر
 * (این داده تقریباً ثابت است، پس cache طولانی می‌گذاریم)
 */

import { useQuery } from "@tanstack/react-query";
import { newsService } from "../../services/news.service";
import type { Category } from "../../types/news";

export const NEWS_CATEGORIES_QUERY_KEY = ["news", "categories"] as const;

export function useNewsCategories() {
  return useQuery<Category[]>({
    queryKey: NEWS_CATEGORIES_QUERY_KEY,
    queryFn: () => newsService.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 دقیقه
    gcTime: 60 * 60 * 1000, // 1 ساعت
  });
}
