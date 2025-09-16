import { User } from "@/types/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storage } from "@/lib/storage";
export type AuthState = {
  authState: {
    deviceFcmToken?: string | null;
    user: User;
  };
  isLoggedIn: boolean;
  isReady: boolean;
};

export type AuthActions = {
  setIsReady(): void;
  setDeviceFcmToken(token: string | null): void;
  setAuthState(state: AuthState["authState"]): void;
  setUserInfo(user: User): void;
  setIsLoggedIn(isLoggedIn: boolean): void;
  reset(): void;
};

export type AuthStore = AuthState & AuthActions;

const InitialState: AuthState = {
  authState: {
    deviceFcmToken: null,
    user: {
      id: "",
      email: "",
      name: "",
      username: "",
    },
  },
  isLoggedIn: false,
  isReady: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...InitialState,
      setIsReady: () => set({ isReady: true }),
      setDeviceFcmToken: (token) =>
        set((state) => ({
          authState: { ...state.authState, deviceFcmToken: token },
        })),
      setAuthState: (authState) => set({ authState }),
      setUserInfo: (user) =>
        set((state) => ({
          authState: { ...state.authState, user },
        })),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn: isLoggedIn }),
      reset: () => set(InitialState),
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => storage),
      onRehydrateStorage(state) {
        return () => {
          if (state) {
            state.setIsReady();
          }
        };
      },
      partialize: (state) => ({
        authState: {
          deviceFcmToken: state.authState.deviceFcmToken,
          user: state.authState.user,
        },
        isLoggedIn: state.isLoggedIn,
        isReady: state.isReady,
      }),
    },
  ),
);
