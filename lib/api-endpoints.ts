const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const AI_BASE_URL = process.env.NEXT_PUBLIC_AI_API_URL;

export const API_ENDPOINTS = {
  auth: {
    signup: `${BASE_URL}/api/v1/auth/signup`,
    LOGIN: `${BASE_URL}/api/v1/auth/signin`,
    REFRESH_TOKEN: `${BASE_URL}/api/v1/auth/refresh`,
    LOGOUT: `${BASE_URL}/api/v1/auth/logout`,
    TwoFA_DISABLE: `${BASE_URL}/api/v1/auth/2fa/disable`,
    FORGOT_PASSWORD: `${BASE_URL}/api/v1/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/api/v1/auth/reset-password`,
  },
};
