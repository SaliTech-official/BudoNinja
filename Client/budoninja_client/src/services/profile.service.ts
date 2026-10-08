/**
 * Service لایه برای endpointهای پروفایل و داشبورد
 */

import api from "../api/axios";
import ENDPOINTS from "../api/endpoints";
import type {
  UserProfile,
  UpdateProfilePayload,
  DashboardInfo,
  MembershipInfo,
} from "../types/profile";

export const profileService = {
  // ── Get Profile ──────────────────────
  getProfile: async (): Promise<UserProfile> => {
    const { data } = await api.get<UserProfile>(ENDPOINTS.profile.me);
    return data;
  },

  // ── Update Profile (PATCH) ───────────
  updateProfile: async (
    payload: UpdateProfilePayload | FormData
  ): Promise<UpdateProfilePayload> => {
    const isFormData = payload instanceof FormData;

    const { data } = await api.patch<UpdateProfilePayload>(
      ENDPOINTS.profile.me,
      payload,
      isFormData
        ? {
            headers: {
              // axios خودش boundary درست رو برای multipart می‌ذاره اگه Content-Type رو undefined بذاریم
              "Content-Type": "multipart/form-data",
            },
          }
        : undefined
    );
    return data;
  },

  // ── Get Dashboard Info ───────────────
  getDashboard: async (): Promise<DashboardInfo> => {
    const { data } = await api.get<DashboardInfo>(ENDPOINTS.profile.dashboard);
    return data;
  },

  // ── Get Membership Info ──────────────
  getMembership: async (): Promise<MembershipInfo> => {
    const { data } = await api.get<MembershipInfo>(
      ENDPOINTS.profile.membership
    );
    return data;
  },
};
