/**
 * Hook تأیید کد OTP
 *
 * در صورت موفقیت:
 * - کاربر تأیید می‌شود
 * - toast موفقیت نمایش داده می‌شود
 * - کاربر به صفحه login هدایت می‌شود
 */

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authService } from "../../services/auth.service";
import { getErrorMessage } from "../../utils/getErrorMessage";
import type { VerifyOtpPayload } from "../../types/auth";

interface UseVerifyOtpOptions {
  redirectTo?: string;
}

export function useVerifyOtp(options?: UseVerifyOtpOptions) {
  const navigate = useNavigate();
  const redirectTo = options?.redirectTo ?? "/login";

  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authService.verifyOtp(payload),
    onSuccess: () => {
      toast.success("حساب شما با موفقیت تأیید شد. لطفاً وارد شوید.");
      navigate(redirectTo, { replace: true });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
