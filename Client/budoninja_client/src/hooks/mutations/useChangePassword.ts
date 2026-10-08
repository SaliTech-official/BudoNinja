/**
 * تغییر رمز عبور کاربر
 * ⚠️ نکته: backend بعد از تغییر رمز، تمام tokenها رو blacklist می‌کنه
 * پس بعد از موفقیت، کاربر باید دوباره login کنه
 */

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authService } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../utils/getErrorMessage";
import type { ChangePasswordPayload } from "../../types/auth";

export function useChangePassword() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      authService.changePassword(payload),
    onSuccess: () => {
      toast.success("رمز عبور با موفقیت تغییر کرد. لطفاً دوباره وارد شوید.");
      // چون backend همه tokenها رو blacklist می‌کنه، logout می‌کنیم
      logout();
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
