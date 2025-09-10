// React Native / Expo friendly axios instance with automatic token refresh
// and no direct usage of browser globals like window or document.

import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  updateAccessToken,
} from "./tokenStorage";
import { ENDPOINTS } from "../api/api-endpoints";
import { CommonResponseDataType } from "@/types/common";

// --------------------------------------------------
// Types & augmentation
// --------------------------------------------------
declare module "axios" {
  // We add a private retry flag to avoid infinite loops
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

type FailedRequest = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

// --------------------------------------------------
// Config
// --------------------------------------------------
const BASE_URL = process.env.EXPO_PUBLIC_API_URL; // Make sure this is defined in app config / env

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // withCredentials is generally not used in React Native (no browser cookies)
  timeout: 30_000,
});

// --------------------------------------------------
// Refresh token flow state
// --------------------------------------------------
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

// --------------------------------------------------
// External handler for forced logout / navigation after refresh failure
// --------------------------------------------------
let unauthorizedHandler: (() => void | Promise<void>) | null = null;
export const setUnauthorizedHandler = (fn: () => void | Promise<void>) => {
  unauthorizedHandler = fn;
};

// --------------------------------------------------
// Request interceptor: attach bearer token
// --------------------------------------------------
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  try {
    const token = await getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {
    // silently ignore token retrieval problems
  }
  return config;
});

// --------------------------------------------------
// Helper: perform refresh
// --------------------------------------------------
const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) throw new Error("Missing refresh token");
  const response = await axios.post(ENDPOINTS.AUTH.REFRESH_TOKEN, {
    refreshToken,
  });
  const newAccessToken = (response.data as { accessToken?: string })
    .accessToken;
  if (!newAccessToken) throw new Error("No access token in refresh response");
  await updateAccessToken(newAccessToken);
  api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
  return newAccessToken;
};

// --------------------------------------------------
// Unified response interceptor (success passthrough + error handling)
// --------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<CommonResponseDataType<unknown>>) => {
    const originalRequest = error.config as
      | InternalAxiosRequestConfig
      | undefined;

    // Network level errors (no response) -> bubble up a friendly error
    if (!error.response) {
      return Promise.reject(
        new Error("Network error. Please check your internet connection.")
      );
    }

    // Non-auth errors: just propagate the server payload
    if (error.response.status !== 401 || !originalRequest) {
      return Promise.reject(
        (error.response.data as CommonResponseDataType<unknown>) ?? error
      );
    }

    // 401 handling with refresh logic
    if (originalRequest._retry) {
      // Already retried once - enforce logout
      await removeTokens();
      if (unauthorizedHandler) await unauthorizedHandler();
      return Promise.reject(
        (error.response.data as CommonResponseDataType<unknown>) ?? error
      );
    }

    if (isRefreshing) {
      // Queue the request until refresh completes
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (typeof token === "string" && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest as AxiosRequestConfig);
        })
        .catch((queueErr) => Promise.reject(queueErr));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newToken = await refreshAccessToken();
      processQueue(null, newToken);
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }
      return api(originalRequest as AxiosRequestConfig);
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      await removeTokens();
      if (unauthorizedHandler) await unauthorizedHandler();
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
