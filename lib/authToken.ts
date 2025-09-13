import { AuthTokenType } from "@/types/common";
import * as SecureStore from "expo-secure-store";

export const saveAuthToken = async (type: AuthTokenType, token: string) => {
  try {
    await SecureStore.setItemAsync(type, token);
  } catch (error) {
    console.error("Error saving auth token:", error);
  }
};

export const getAuthToken = async (type: AuthTokenType) => {
  try {
    const token = await SecureStore.getItemAsync(type);
    return token;
  } catch (error) {
    console.error("Error getting auth token:", error);
  }
};

export const removeAuthToken = async (type: AuthTokenType) => {
  try {
    await SecureStore.deleteItemAsync(type);
  } catch (error) {
    console.error("Error removing auth token:", error);
  }
};
