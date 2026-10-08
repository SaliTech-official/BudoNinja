/**
 * آپدیت پروفایل کاربر (PATCH)
 * فقط فیلدهایی که تغییر کردن ارسال می‌شن
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { profileService } from "../../services/profile.service";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { PROFILE_QUERY_KEY } from "../queries/useProfile";
import type { UpdateProfilePayload } from "../../types/profile";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      profileService.updateProfile(payload),
    onSuccess: () => {
      toast.success("اطلاعات با موفقیت ذخیره شد");
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
