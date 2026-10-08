const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const authStorage = {
  // ── Access Token ──────────────────────
  getAccessToken: (): string | null => {
    try {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setAccessToken: (token: string): void => {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch {
      // اگر storage پر بود یا private mode بود
      console.error("Failed to save access token");
    }
  },

  // ── Refresh Token ─────────────────────
  getRefreshToken: (): string | null => {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setRefreshToken: (token: string): void => {
    try {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } catch {
      console.error("Failed to save refresh token");
    }
  },

  // ── Set Both ──────────────────────────
  setTokens: (access: string, refresh: string): void => {
    authStorage.setAccessToken(access);
    authStorage.setRefreshToken(refresh);
  },

  // ── Clear ─────────────────────────────
  clearTokens: (): void => {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch {
      console.error("Failed to clear tokens");
    }
  },

  // ── Check ─────────────────────────────
  hasAccessToken: (): boolean => {
    return !!authStorage.getAccessToken();
  },
};
