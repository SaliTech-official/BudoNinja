/**
 * Service لایه برای endpointهای news
 */

import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";
import type {
  News,
  NewsListResponse,
  NewsListParams,
  NewsDetailResponse,
  Category,
} from "../types/news";

export const newsService = {
  // ── List ────────────────────────────
  getList: async (params?: NewsListParams): Promise<NewsListResponse> => {
    const { data } = await api.get<NewsListResponse>(ENDPOINTS.news.list, {
      params,
    });
    return data;
  },

  // ── Detail ──────────────────────────
  getDetail: async (id: number | string): Promise<News> => {
    const { data } = await api.get<NewsDetailResponse>(
      ENDPOINTS.news.detail(id)
    );
    return data.data;
  },

  // ── Categories ──────────────────────
  getCategories: async (): Promise<Category[]> => {
    const { data } = await api.get<Category[]>(ENDPOINTS.news.categories);
    return data;
  },
};
