// api-client.ts
import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

import { ENDPOINTS } from "../api/api-endpoints";
import { AuthTokenType, CommonResponseDataType } from "@/types/common";
import { getAuthToken, removeAuthToken, saveAuthToken } from "./authToken";

// ---- augment axios config to hold a retry flag ----
declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

type FailedRequest = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || ""; // make sure this is defined

// main API instance (used for all normal calls)
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// authApi: used ONLY for token refresh calls (no request interceptor)
const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// refresh flow state
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

// external handler for forced logout / navigation after refresh failure
let unauthorizedHandler: (() => void | Promise<void>) | null = null;
export const setUnauthorizedHandler = (fn: () => void | Promise<void>) => {
  unauthorizedHandler = fn;
};

// Request interceptor: attach bearer token (if available)
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await getAuthToken(AuthTokenType.ACCESS_TOKEN);
      if (token && typeof token === "string" && token.trim().length > 0) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      // silent fail — but log in dev
      if (__DEV__)
        console.warn("getAuthToken failed in request interceptor", err);
    }
    return config;
  },
  (err) => Promise.reject(err),
);

// Helper: perform refresh using authApi (no auth header attached)
export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = await getAuthToken(AuthTokenType.REFRESH_TOKEN);
  if (!refreshToken || typeof refreshToken !== "string") {
    throw new Error("Missing refresh token");
  }

  // POST to refresh endpoint using authApi so it uses baseURL and no auth header
  const response = await authApi.post(ENDPOINTS.AUTH.REFRESH_TOKEN, {
    refresh_token: refreshToken,
  });

  console.log("Refresh response:", response.data);

  // accept multiple possible response shapes
  const d = response.data ?? {};
  const newAccessToken =
    d.accessToken ?? d.access_token ?? d.token ?? d.access ?? null;
  const newRefreshToken = d.refreshToken ?? d.refresh_token ?? null;

  if (!newAccessToken || typeof newAccessToken !== "string") {
    throw new Error("No access token in refresh response");
  }

  // save tokens
  await saveAuthToken(AuthTokenType.ACCESS_TOKEN, newAccessToken);
  if (newRefreshToken && typeof newRefreshToken === "string") {
    await saveAuthToken(AuthTokenType.REFRESH_TOKEN, newRefreshToken);
  }

  // update default header for future requests
  api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
  if (__DEV__) console.log("Token refreshed successfully");
  return newAccessToken;
};

// Response interceptor: handle network errors + 401 refresh logic
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<CommonResponseDataType<unknown>>) => {
    const originalRequest = error.config as
      | InternalAxiosRequestConfig
      | undefined;

    // network-level (no response)
    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        return Promise.reject(
          new Error("Request timed out. Please try again."),
        );
      }
      return Promise.reject(
        new Error("Network error. Check your internet connection."),
      );
    }

    // skip refresh logic for auth endpoints that create/replace tokens
    const url = originalRequest?.url ?? "";
    if (
      url.includes("/signin") ||
      url.includes("/signup") ||
      url.includes("/signout") ||
      url.includes(ENDPOINTS.AUTH.REFRESH_TOKEN)
    ) {
      return Promise.reject(
        (error.response.data as CommonResponseDataType<unknown>) ?? error,
      );
    }

    // non-401 => propagate backend payload
    if (error.response.status !== 401 || !originalRequest) {
      return Promise.reject(
        (error.response.data as CommonResponseDataType<unknown>) ?? error,
      );
    }

    // If request was already retried -> force logout
    if (originalRequest._retry) {
      await removeAuthToken(AuthTokenType.ACCESS_TOKEN);
      await removeAuthToken(AuthTokenType.REFRESH_TOKEN);
      // if (unauthorizedHandler) await unauthorizedHandler();
      return Promise.reject(
        (error.response.data as CommonResponseDataType<unknown>) ?? error,
      );
    }

    // If a refresh is already happening, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          // token is the new access token
          originalRequest.headers = originalRequest.headers ?? {};
          if (typeof token === "string") {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest as AxiosRequestConfig);
        })
        .catch((err) => Promise.reject(err));
    }

    // perform refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newToken = await refreshAccessToken();
      processQueue(null, newToken);

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest as AxiosRequestConfig);
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      // clear tokens and call unauthorized handler
      await removeAuthToken(AuthTokenType.ACCESS_TOKEN);
      await removeAuthToken(AuthTokenType.REFRESH_TOKEN);
      // if (unauthorizedHandler) await unauthorizedHandler();
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
