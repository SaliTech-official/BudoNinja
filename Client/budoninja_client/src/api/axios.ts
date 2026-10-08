/**
 * Axios instance با interceptor برای:
 * - ضمیمه کردن JWT access token به همه requestها
 * - refresh کردن خودکار access token در صورت 401
 * - logout خودکار در صورت شکست refresh
 */

import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { authStorage } from "../utils/storage";
import ENDPOINTS from "./endpoints";

// ── Base URL ─────────────────────────────
const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  // در زمان development به برنامه‌نویس هشدار بدهیم
  console.error(
    "⚠️ VITE_API_BASE_URL is not defined. Please set it in your .env file."
  );
}

// ── Axios Instance ───────────────────────
const api = axios.create({
  baseURL,
  withCredentials: true, // برای session cookieها (register/verify از session استفاده می‌کنند)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000, // 30 ثانیه
});

// ── Request Interceptor: Attach Token ────
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authStorage.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: Refresh Token ──

// برای جلوگیری از چند refresh همزمان
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null): void => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // اگر 401 نیست یا قبلاً retry شده، رد کن
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // اگر خود endpoint refresh دچار 401 شده، logout
    if (originalRequest.url?.includes(ENDPOINTS.auth.refreshToken)) {
      authStorage.clearTokens();
      // redirect to login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    // اگر در حال refresh هست، صبر کن
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = authStorage.getRefreshToken();

    if (!refreshToken) {
      isRefreshing = false;
      authStorage.clearTokens();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    try {
      // درخواست refresh — از یک axios جدید استفاده می‌کنیم تا interceptor دوباره trigger نشه
      const { data } = await axios.post(
        `${baseURL}${ENDPOINTS.auth.refreshToken}`,
        { refresh: refreshToken },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const newAccessToken = data.access as string;
      const newRefreshToken = data.refresh as string | undefined;

      authStorage.setAccessToken(newAccessToken);

      // اگر refresh جدید هم آمد (به دلیل ROTATE_REFRESH_TOKENS=True)
      if (newRefreshToken) {
        authStorage.setRefreshToken(newRefreshToken);
      }

      processQueue(null, newAccessToken);

      // درخواست اصلی را با توکن جدید دوباره بفرست
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      authStorage.clearTokens();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
