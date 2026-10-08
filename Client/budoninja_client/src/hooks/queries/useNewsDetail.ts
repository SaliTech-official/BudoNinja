/**
 * گرفتن جزئیات یک خبر
 */

import { useQuery } from "@tanstack/react-query";
import { newsService } from "../../services/news.service";

export const NEWS_DETAIL_QUERY_KEY = (id: number | string | undefined) =>
  ["news", "detail", id] as const;

export function useNewsDetail(id: number | string | undefined) {
  return useQuery({
    queryKey: NEWS_DETAIL_QUERY_KEY(id),
    queryFn: () => newsService.getDetail(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 دقیقه
  });
}
