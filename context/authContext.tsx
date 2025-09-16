import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect } from "react";
import { SignInRequest, useUserSignIn } from "@/hooks/api/auth/useSignIn";
import { useUserSignOut } from "@/hooks/api/auth/useSignOut";
import { useAuthStore } from "@/hooks/useAuthStore";
import { getAuthToken, removeAuthToken, saveAuthToken } from "@/lib/authToken";
import { AuthTokenType } from "@/types/common";
import api, { setUnauthorizedHandler } from "@/lib/axios";
import { ENDPOINTS } from "@/api/api-endpoints";
import { useDataPreloader } from "@/hooks/useDataPreloader";
import { queryKeys } from "@/constants/queryKeys";

SplashScreen.preventAutoHideAsync();

type AuthState = {
  isReady: boolean;
  isLoggedIn: boolean;
  isSigningIn: boolean;
  isSigningOut: boolean;
  handleSignIn: (data: SignInRequest) => Promise<void>;
  handleSignOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthState>({
  isReady: false,
  isLoggedIn: false,
  isSigningIn: false,
  isSigningOut: false,
  handleSignIn: async (data: SignInRequest) => {},
  handleSignOut: async () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const { signIn, isPending: isSigningIn } = useUserSignIn();
  const { signOut, isPending: isSigningOut } = useUserSignOut();
  const { authState, setAuthState, reset, isReady, setIsLoggedIn, isLoggedIn } =
    useAuthStore();
  const { prefetching } = useDataPreloader([
    {
      key: queryKeys.allCategories,
      fetcher: async () => {
        const response = await api.get(ENDPOINTS.CATEGORIES.GET_ALL);
        return response.data;
      },
    },
    {
      key: queryKeys.allFoods,
      fetcher: async () => {
        const response = await api.get(ENDPOINTS.FOODS.GET_ALL);
        return response.data;
      },
    },
  ]);

  const router = useRouter();

  const handleSignIn = async (data: SignInRequest) => {
    try {
      const response = await signIn(data);
      if (response) {
        setIsLoggedIn(true);
        setAuthState({
          user: response.data.data.user,
        });
      }
      await saveAuthToken(
        AuthTokenType.ACCESS_TOKEN,
        response.data.data.accessToken
      );
      await saveAuthToken(
        AuthTokenType.REFRESH_TOKEN,
        response.data.data.refreshToken
      );
      router.replace("/(protected)/(tabs)/home");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({ userId: authState.user?.id! });
      setIsLoggedIn(false);
      await removeAuthToken(AuthTokenType.ACCESS_TOKEN);
      await removeAuthToken(AuthTokenType.REFRESH_TOKEN);
      reset();
      router.replace("/welcome");
    } catch (error) {
      console.error("Error signing out:", error);
      await removeAuthToken(AuthTokenType.ACCESS_TOKEN);
      await removeAuthToken(AuthTokenType.REFRESH_TOKEN);
      setIsLoggedIn(false);
      reset();
      router.replace("/sign-in");
    }
  };

  // periodically refresh access token
  useEffect(() => {
    const interval = setInterval(async () => {
      const storedRefreshToken = await getAuthToken(
        AuthTokenType.REFRESH_TOKEN
      );
      if (!storedRefreshToken) {
        router.replace("/sign-in");
      }
      const response = await api.post(ENDPOINTS.AUTH.REFRESH_TOKEN, {
        refresh_token: storedRefreshToken,
      });
      await saveAuthToken(
        AuthTokenType.ACCESS_TOKEN,
        response.data.data.accessToken
      );
      await saveAuthToken(
        AuthTokenType.REFRESH_TOKEN,
        response.data.data.refreshToken
      );
    }, 14 * 60 * 1000); // every 14 min
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    setUnauthorizedHandler(async () => {
      // Custom logic: e.g., reset auth state, navigate to login, show alert, etc.
      await handleSignOut(); // or your logout logic
    });
  }, []);
  useEffect(() => {
    if (isReady && !prefetching) {
      SplashScreen.hideAsync();
    }
  }, [isReady, prefetching]);

  return (
    <AuthContext.Provider
      value={{
        isReady,
        isLoggedIn,
        isSigningIn,
        isSigningOut,
        handleSignIn,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
