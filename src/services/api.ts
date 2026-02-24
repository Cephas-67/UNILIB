// src/services/api.ts
// Axios instance shared across all services.
// – Automatically attaches the JWT Bearer token from localStorage.
// – On 401, attempts a silent token refresh and retries the request once.
// – If refresh also fails, clears tokens and redirects to login.

import axios, { AxiosRequestConfig } from "axios";

export const BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ── Request interceptor: attach access token ──────────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("unilib_access_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: silent token refresh on 401 ────────────────────────
let isRefreshing = false;
let failedQueue: { resolve: (v: string) => void; reject: (e: unknown) => void }[] = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !original._retry) {
      const refresh = localStorage.getItem("unilib_refresh_token");
      if (!refresh) {
        clearSession();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (original.headers) original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(`${BASE_URL}/api/auth/token/refresh/`, { refresh });
        const newAccess: string = data.access;
        localStorage.setItem("unilib_access_token", newAccess);
        processQueue(null, newAccess);
        if (original.headers) original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearSession();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export function clearSession() {
  localStorage.removeItem("unilib_access_token");
  localStorage.removeItem("unilib_refresh_token");
  localStorage.removeItem("unilib_user");
  window.location.href = "/e-fri/connexion";
}

export default api;
