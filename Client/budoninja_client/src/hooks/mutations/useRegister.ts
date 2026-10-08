/**
 * Hook ثبت‌نام کاربر جدید
 *
 * در صورت موفقیت:
 * - toast موفقیت نمایش داده می‌شود
 * - phone_number برای مرحله verify ذخیره می‌شود
 *
 * نکته: خود backend بعد از register، OTP رو ارسال می‌کنه و session می‌سازه
 */

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authService } from "../../services/auth.service";
import { getErrorMessage } from "../../utils/getErrorMessage";
import type { RegisterPayload } from "../../types/auth";

interface UseRegisterOptions {
  onSuccess?: (payload: RegisterPayload) => void;
}

export function useRegister(options?: UseRegisterOptions) {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (_data, variables) => {
      toast.success("ثبت‌نام انجام شد. کد تأیید برای شما ارسال شد.");
      options?.onSuccess?.(variables);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
