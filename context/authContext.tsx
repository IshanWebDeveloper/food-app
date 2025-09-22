import { SplashScreen, useRouter } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
} from "react";
import { SignInRequest, useUserSignIn } from "@/hooks/api/auth/useSignIn";
import { useUserSignOut } from "@/hooks/api/auth/useSignOut";
import { useAuthStore } from "@/hooks/useAuthStore";
import { removeAuthToken, saveAuthToken } from "@/lib/authToken";
import { AuthTokenType } from "@/types/common";
import api, { setUnauthorizedHandler } from "@/lib/axios";
import { ToastAndroid } from "react-native";

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
        response.data.data.accessToken,
      );
      await saveAuthToken(
        AuthTokenType.REFRESH_TOKEN,
        response.data.data.refreshToken,
      );
      api.defaults.headers.common["Authorization"] =
        `Bearer ${response.data.data.accessToken}`;
      ToastAndroid.show("Sign in successful", ToastAndroid.SHORT);
      router.replace("/(protected)/(home)");
    } catch (error) {
      console.error("Sign-in error:", error);
      ToastAndroid.showWithGravity(
        "Failed to sign in. Please check your credentials and try again.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  const handleSignOut = useCallback(async () => {
    try {
      await signOut({ userId: authState.user?.id! });
      setIsLoggedIn(false);
      await removeAuthToken(AuthTokenType.ACCESS_TOKEN);
      await removeAuthToken(AuthTokenType.REFRESH_TOKEN);
      reset();
      router.replace("/sign-in");
    } catch (error) {
      console.error(error);
      ToastAndroid.showWithGravity(
        "Error signing out. Please try again.",
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
      await removeAuthToken(AuthTokenType.ACCESS_TOKEN);
      await removeAuthToken(AuthTokenType.REFRESH_TOKEN);
      setIsLoggedIn(false);
      reset();
      router.replace("/sign-in");
    }
  }, [router, signOut, authState.user?.id, reset, setIsLoggedIn]);

  useEffect(() => {
    setUnauthorizedHandler(async () => {
      // Custom logic: e.g., reset auth state, navigate to login, show alert, etc.
      await removeAuthToken(AuthTokenType.ACCESS_TOKEN);
      await removeAuthToken(AuthTokenType.REFRESH_TOKEN);
      setIsLoggedIn(false);
      reset();
      router.replace("/sign-in");
    });
  }, [reset, router, setIsLoggedIn, isLoggedIn]);
  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

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
