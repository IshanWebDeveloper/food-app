const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
export const ENDPOINTS = {
  AUTH: {
    SIGNUP: `${BASE_URL}/api/v1/auth/signup`,
    SIGNIN: `${BASE_URL}/api/v1/auth/signin`,
    REFRESH_TOKEN: `${BASE_URL}/api/v1/auth/refresh`,
    SIGNOUT: `${BASE_URL}/api/v1/auth/signout`,
    FORGOT_PASSWORD: `${BASE_URL}/api/v1/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/api/v1/auth/reset-password`,
  },
};
