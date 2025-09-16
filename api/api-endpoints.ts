const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
export const ENDPOINTS = {
  AUTH: {
    SIGNUP: `${BASE_URL}/api/v1/auth/signup`,
    SIGNIN: `${BASE_URL}/api/v1/auth/signin`,
    SIGNOUT: `${BASE_URL}/api/v1/auth/signout`,
    EDIT_PROFILE: (userId: string) =>
      `${BASE_URL}/api/v1/auth/edit-profile/${userId}`,
    REFRESH_TOKEN: `${BASE_URL}/api/v1/auth/refresh-token`,
  },
  USER: {
    GET_PROFILE: `${BASE_URL}/api/v1/user/profile`,
  },
  CATEGORIES: {
    GET_ALL: `${BASE_URL}/api/v1/categories`,
  },
  FOODS: {
    GET_ALL: `${BASE_URL}/api/v1/foods`,
    GET_BY_ID: (id: string) => `${BASE_URL}/api/v1/foods/${id}`,
  },
};
