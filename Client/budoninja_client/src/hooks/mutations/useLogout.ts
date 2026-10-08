/**
 * Hook خروج از سیستم
 *
 * - refresh token را به backend می‌فرستد تا blacklist شود
 * - حتی اگر backend خطا داد، state محلی پاک می‌شود
 */

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authService } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
import { authStorage } from "../../utils/storage";

export function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const refresh = authStorage.getRefreshToken();
      if (refresh) {
        // حتی اگر این درخواست fail شد، logout محلی انجام می‌شه
        try {
          await authService.logout({ refresh });
        } catch (err) {
          console.warn("Backend logout failed, but local logout proceeds", err);
        }
      }
    },
    onSettled: () => {
      // در هر صورت (موفق یا ناموفق) state محلی پاک می‌شه
      logout();
      toast.success("با موفقیت خارج شدید");
      navigate("/login", { replace: true });
    },
  });
}
