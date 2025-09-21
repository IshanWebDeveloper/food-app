import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
  isSuccessResponse,
  isNoSavedCredentialFoundResponse,
} from "@react-native-google-signin/google-signin";
import { useCallback, useEffect } from "react";

import Toast from "react-native-toast-message";
import { useUserSignIn } from "./api/auth/useSignIn";
import { useRouter } from "expo-router";

const useGoogleSignIn = () => {
  const { signIn } = useUserSignIn();

  const router = useRouter();
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const googleSigninResponse = await GoogleSignin.signIn();

      if (googleSigninResponse && isSuccessResponse(googleSigninResponse)) {
        try {
          const response = await signIn({
            email: googleSigninResponse.data.user.email,
            password: googleSigninResponse.data.user.name || "",
          });
          if (response.status === 200) {
            router.replace("/(protected)/(home)");
          }
          Toast.show({
            type: "success",
            text1: response.data.message,
            position: "top",
          });
        } catch (error: any) {
          Toast.show({
            type: "error",
            text1: "Failed to login",
            text2: error?.data?.message || error.message,
            position: "bottom",
          });
        }
      } else if (
        isNoSavedCredentialFoundResponse(await GoogleSignin.signInSilently())
      ) {
        // Android and Apple only.
        // No saved credential found (user has not signed in yet, or they revoked access)
        // call `createAccount()`
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
  }, [signIn, router]);

  return {
    handleGoogleSignIn,
  };
};

export default useGoogleSignIn;
