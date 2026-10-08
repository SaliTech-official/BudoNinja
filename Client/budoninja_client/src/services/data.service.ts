/**
 * Service لایه برای endpointهای داده پایه (استان و شهر)
 */

import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";
import type { Province, City } from "../types/common";

export const dataService = {
  // ── Get All Provinces ────────────────
  getProvinces: async (): Promise<Province[]> => {
    const { data } = await api.get<Province[]>(ENDPOINTS.data.provinces);
    return data;
  },

  // ── Get Cities by Province ───────────
  getCities: async (provinceId: number | string): Promise<City[]> => {
    const { data } = await api.get<City[]>(ENDPOINTS.data.cities, {
      params: { province: provinceId },
    });
    return data;
  },
};
