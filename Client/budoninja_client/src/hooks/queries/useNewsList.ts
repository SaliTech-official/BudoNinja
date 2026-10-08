/**
 * گرفتن لیست اخبار (با pagination و فیلتر)
 */

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { newsService } from "../../services/news.service";
import type { NewsListParams } from "../../types/news";

export const NEWS_LIST_QUERY_KEY = (params?: NewsListParams) =>
  ["news", "list", params ?? {}] as const;

export function useNewsList(params?: NewsListParams) {
  return useQuery({
    queryKey: NEWS_LIST_QUERY_KEY(params),
    queryFn: () => newsService.getList(params),
    staleTime: 2 * 60 * 1000, // 2 دقیقه
    placeholderData: keepPreviousData, // برای pagination smooth
  });
}
