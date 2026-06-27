// src/store/authStore.ts

// ساده‌ترین حالت بدون Zustand
// اگر خواستی بعداً Zustand اضافه می‌کنیم

export const authStorage = {
    getAccessToken: (): string | null => {
      return localStorage.getItem("access_token");
    },
  
    getRefreshToken: (): string | null => {
      return localStorage.getItem("refresh_token");
    },
  
    setTokens: (access: string, refresh: string): void => {
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
    },
  
    clearTokens: (): void => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  
    isAuthenticated: (): boolean => {
      return !!localStorage.getItem("access_token");
    },
  };