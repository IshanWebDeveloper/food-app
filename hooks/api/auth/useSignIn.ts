import { ENDPOINTS } from "@/api/api-endpoints";
import api from "@/lib/axios";
import { CommonResponseDataType, SocialLoginProvider } from "@/types/common";
import { User } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export interface SignInRequest {
  email: string;
  password?: string;
  is_Social_login: boolean;
  Social_login_provider?: SocialLoginProvider;
}

interface SignInResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export function useUserSignIn() {
  const signInMutation = useMutation({
    mutationFn: async (data: SignInRequest) => {
      return await api.post<CommonResponseDataType<SignInResponse>>(
        ENDPOINTS.AUTH.SIGNIN,
        data,
      );
    },
  });

  return {
    signIn: signInMutation.mutateAsync,
    isPending: signInMutation.isPending,
    isLoaded: signInMutation.isSuccess,
    isError: signInMutation.isError,
    error: signInMutation.error,
  };
}
