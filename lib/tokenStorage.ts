import * as SecureStore from "expo-secure-store";

export const saveTokens = async (accessToken: string, refreshToken: string) => {
  await SecureStore.setItemAsync("accessToken", accessToken);
  await SecureStore.setItemAsync("refreshToken", refreshToken);
};

export const getAccessToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync("accessToken");
};

export const getRefreshToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync("refreshToken");
};

export const removeTokens = async () => {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
};

export const updateAccessToken = async (accessToken: string) => {
  await SecureStore.setItemAsync("accessToken", accessToken);
};

export const updateRefreshToken = async (refreshToken: string) => {
  await SecureStore.setItemAsync("refreshToken", refreshToken);
};
