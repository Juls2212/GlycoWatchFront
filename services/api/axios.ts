import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL } from "@/lib/constants";
import { tokenStorage } from "@/lib/token";
import type { ApiResponse } from "@/types/api.types";
import type { RefreshTokenResponseDTO } from "@/types/auth.types";

// ─── Axios instance ───────────────────────────────────────────────────────────

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
});

// ─── Request interceptor: attach JWT ─────────────────────────────────────────

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor: handle 401 + token refresh ────────────────────────

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

function processQueue(token: string): void {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
}

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !original._retry) {
      const refreshToken = tokenStorage.getRefreshToken();

      if (!refreshToken) {
        tokenStorage.clearAll();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(original));
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post<ApiResponse<RefreshTokenResponseDTO>>(
          `${API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );
        const newToken = data.data.accessToken;
        tokenStorage.setAccessToken(newToken);
        processQueue(newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(original);
      } catch {
        tokenStorage.clearAll();
        window.location.href = "/login";
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);