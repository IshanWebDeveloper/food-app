import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect } from "react";
import { SignInRequest, useUserSignIn } from "@/hooks/api/auth/useSignIn";
import { SignOutRequest, useUserSignOut } from "@/hooks/api/auth/useSignOut";
import { useAuthStore } from "@/hooks/useAuthStore";
import { removeAuthToken, saveAuthToken } from "@/lib/authToken";
import { AUTH_TOKEN_KEY } from "@/constants/authKey";
import { AuthTokenType } from "@/types/common";
SplashScreen.preventAutoHideAsync();

type AuthState = {
  isReady: boolean;
  isLoggedIn: boolean;
  isSigningIn: boolean;
  isSigningOut: boolean;
  handleSignIn: (data: SignInRequest) => Promise<void>;
  handleSignOut: (data: SignOutRequest) => Promise<void>;
};

export const AuthContext = createContext<AuthState>({
  isReady: false,
  isLoggedIn: false,
  isSigningIn: false,
  isSigningOut: false,
  handleSignIn: async (data: SignInRequest) => {},
  handleSignOut: async (data: SignOutRequest) => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const { signIn, isPending: isSigningIn } = useUserSignIn();
  const { signOut, isPending: isSigningOut } = useUserSignOut();
  const { setAuthState, reset, isReady, setIsLoggedIn, isLoggedIn } =
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

  const handleSignOut = async (data: SignOutRequest) => {
    try {
      await signOut(data);
      setIsLoggedIn(false);
      await removeAuthToken(AuthTokenType.ACCESS_TOKEN);
      await removeAuthToken(AuthTokenType.REFRESH_TOKEN);
      reset();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
