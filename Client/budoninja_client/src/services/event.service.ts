/**
 * Service لایه برای endpointهای events (chalenge)
 */

import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";
import type {
  ChalengeItem,
  ChalengeListResponse,
  ChalengeListParams,
} from "../types/event";

export const eventService = {
  // ── List ────────────────────────────
  getList: async (
    params?: ChalengeListParams
  ): Promise<ChalengeListResponse> => {
    const { data } = await api.get<ChalengeListResponse>(
      ENDPOINTS.events.list,
      { params }
    );
    return data;
  },

  // ── Detail ──────────────────────────
  getDetail: async (id: number | string): Promise<ChalengeItem> => {
    const { data } = await api.get<ChalengeItem>(ENDPOINTS.events.detail(id));
    return data;
  },
};
