import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
  isSuccessResponse,
  isNoSavedCredentialFoundResponse,
} from "@react-native-google-signin/google-signin";
import { useCallback, useEffect } from "react";

import { useRouter } from "expo-router";
import { ToastAndroid } from "react-native";
import { AuthTokenType, SocialLoginProvider } from "@/types/common";
import { useOauthSignIn } from "./api/auth/useOauthSignIn";
import { useAuthStore } from "./useAuthStore";
import { saveAuthToken } from "@/lib/authToken";
import api from "@/lib/axios";

const useGoogleSignIn = () => {
  const { oAuthSignIn } = useOauthSignIn();
  const { setAuthState, setIsLoggedIn } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const googleSigninResponse = await GoogleSignin.signIn();

      if (googleSigninResponse && isSuccessResponse(googleSigninResponse)) {
        try {
          const response = await oAuthSignIn({
            email: googleSigninResponse.data.user.email,
            name: googleSigninResponse.data.user.name || "",
            username: googleSigninResponse.data.user.givenName || "",
            is_Social_login: true,
            Social_login_provider: SocialLoginProvider.GOOGLE,
          });
          if (response.status === 200) {
            ToastAndroid.showWithGravity(
              "Sign in successful",
              ToastAndroid.SHORT,
              ToastAndroid.TOP,
            );
            setIsLoggedIn(true);
            setAuthState({
              user: response.data.data.user,
            });
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
            router.replace("/(protected)/(home)");
          } else {
            ToastAndroid.show(
              "Failed to sign in. Please check your credentials and try again.",
              ToastAndroid.SHORT,
            );
          }
        } catch (error: any) {
          console.error("Google sign-in error:", error);
          ToastAndroid.show(
            "Failed to sign in. Please check your credentials and try again.",
            ToastAndroid.SHORT,
          );
        }
      } else if (
        isNoSavedCredentialFoundResponse(await GoogleSignin.signInSilently())
      ) {
        // Android and Apple only.
        // No saved credential found (user has not signed in yet, or they revoked access)
        // call `createAccount()`
        ToastAndroid.show("No saved credentials found", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // Android-only, you probably have hit rate limiting.
            // You can still call `presentExplicitSignIn` in this case.
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android: play services not available or outdated.
            // Get more details from `error.userInfo`.
            // Web: when calling an unimplemented api (requestAuthorization)
            // or when the Google Client Library is not loaded yet.
            break;
          default:
          // something else happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  }, [oAuthSignIn, router, setAuthState, setIsLoggedIn]);

  return {
    handleGoogleSignIn,
  };
};

export default useGoogleSignIn;
