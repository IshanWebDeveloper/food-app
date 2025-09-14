const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
export const ENDPOINTS = {
  AUTH: {
    SIGNUP: `${BASE_URL}/api/v1/auth/signup`,
    SIGNIN: `${BASE_URL}/api/v1/auth/signin`,
    EDIT_PROFILE: `${BASE_URL}/api/v1/auth/edit-profile`,
    REFRESH_TOKEN: `${BASE_URL}/api/v1/auth/refresh`,
  },
};
