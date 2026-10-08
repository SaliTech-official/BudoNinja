/**
 * گرفتن پروفایل کاربر فعلی
 * فقط زمانی اجرا می‌شود که کاربر authenticated باشد
 */

import { useQuery } from "@tanstack/react-query";
import { profileService } from "../../services/profile.service";
import { authStorage } from "../../utils/storage";

export const PROFILE_QUERY_KEY = ["profile", "me"] as const;

export function useProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: profileService.getProfile,
    enabled: authStorage.hasAccessToken(),
    staleTime: 5 * 60 * 1000, // 5 دقیقه
  });
}
