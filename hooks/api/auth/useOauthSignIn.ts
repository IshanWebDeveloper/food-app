import { ENDPOINTS } from "@/api/api-endpoints";
import api from "@/lib/axios";
import { CommonResponseDataType, SocialLoginProvider } from "@/types/common";
import { User } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export interface SignInRequest {
  email: string;
  name: string;
  username?: string;
  image_url?: string;
  password?: string;
  is_Social_login: boolean;
  Social_login_provider?: SocialLoginProvider;
}

interface SignInResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export function useOauthSignIn() {
  const oauthSignInMutation = useMutation({
    mutationFn: async (data: SignInRequest) => {
      return await api.post<CommonResponseDataType<SignInResponse>>(
        ENDPOINTS.AUTH.OAUTH_SIGNIN_GOOGLE,
        data,
      );
    },
  });

  return {
    oAuthSignIn: oauthSignInMutation.mutateAsync,
    isPending: oauthSignInMutation.isPending,
    isLoaded: oauthSignInMutation.isSuccess,
    isError: oauthSignInMutation.isError,
    error: oauthSignInMutation.error,
  };
}
