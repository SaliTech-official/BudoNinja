/**
 * Context احراز هویت
 *
 * این Context وضعیت کلی auth را در سراسر اپ نگه می‌دارد:
 * - user (پروفایل کاربر)
 * - isAuthenticated
 * - isLoading (در حال بررسی اولیه)
 * - login() — بعد از دریافت توکن از API
 * - logout() — پاک کردن توکن و وضعیت
 *
 * این Context مستقیماً درخواست login/logout نمی‌زند،
 * فقط state را مدیریت می‌کند.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authStorage } from "../utils/storage";
import { profileService } from "../services/profile.service";
import type { UserProfile } from "../types/profile";

// ── Types ─────────────────────────────────
interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => void;
  refetchUser: () => Promise<void>;
}

// ── Context ───────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null);

// ── Provider ──────────────────────────────
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // گرفتن پروفایل کاربر از API
  const fetchUser = useCallback(async () => {
    try {
      const profile = await profileService.getProfile();
      setUser(profile);
    } catch (error) {
      // اگر گرفتن پروفایل fail شد (مثلاً 401)، توکن‌ها نامعتبرن
      console.error("Failed to fetch user profile:", error);
      authStorage.clearTokens();
      setUser(null);
    }
  }, []);

  // در اولین mount، اگر توکن داریم، پروفایل رو بگیر
  useEffect(() => {
    const initAuth = async () => {
      if (authStorage.hasAccessToken()) {
        await fetchUser();
      }
      setIsLoading(false);
    };
    initAuth();
  }, [fetchUser]);

  // ── Login ─────────────────────────────
  const login = useCallback(
    async (accessToken: string, refreshToken: string) => {
      authStorage.setTokens(accessToken, refreshToken);
      await fetchUser();
    },
    [fetchUser]
  );

  // ── Logout ────────────────────────────
  const logout = useCallback(() => {
    authStorage.clearTokens();
    setUser(null);
    // پاک کردن همه cacheهای react-query
    queryClient.clear();
  }, [queryClient]);

  // ── Refetch User ──────────────────────
  const refetchUser = useCallback(async () => {
    if (authStorage.hasAccessToken()) {
      await fetchUser();
    }
  }, [fetchUser]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Hook ──────────────────────────────────
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
