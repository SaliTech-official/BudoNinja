/**
 * Hook ورود به سیستم
 *
 * در صورت موفقیت:
 * - توکن‌ها در localStorage ذخیره می‌شوند (توسط AuthContext)
 * - profile گرفته می‌شود
 * - toast موفقیت نمایش داده می‌شود
 * - کاربر به dashboard (یا مسیر اولیه) redirect می‌شود
 */

import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { authService } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../utils/getErrorMessage";
import type { LoginPayload } from "../../types/auth";

interface LocationState {
  from?: { pathname: string };
}

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: async (data) => {
      // توکن‌ها رو در context و localStorage ذخیره می‌کنیم
      await login(data.access, data.refresh);

      toast.success("با موفقیت وارد شدید");

      // اگر کاربر از یک صفحه protected اومده، برش گردون اونجا
      const state = location.state as LocationState | null;
      const from = state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
