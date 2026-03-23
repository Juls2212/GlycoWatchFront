import { TOKEN_KEY, REFRESH_TOKEN_KEY } from "./constants";

export const tokenStorage = {
  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  setAccessToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearAll(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  hasToken(): boolean {
    return Boolean(this.getAccessToken());
  },
};