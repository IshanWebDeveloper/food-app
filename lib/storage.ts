import { StateStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

export const storage: StateStorage = {
  setItem: async (name, value) => {
    const jsonValue = JSON.stringify(value);
    return await SecureStore.setItemAsync(name, jsonValue);
  },
  getItem: async (name) => {
    const jsonValue = await SecureStore.getItemAsync(name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  },
  removeItem: async (name) => {
    return await SecureStore.deleteItemAsync(name);
  },
};
