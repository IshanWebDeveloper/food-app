import { ENDPOINTS } from "@/api/api-endpoints";
import api from "@/lib/axios";
import { CommonResponseDataType } from "@/types/common";
import { User } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export interface SignInRequest {
  email: string;
  password: string;
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
        data
      );
    },
    onError: (error: any) => {
      console.error("Sign-in error:", error);
    }
  });

  return {
    signIn: signInMutation.mutateAsync,
    isPending: signInMutation.isPending,
    isLoaded: signInMutation.isSuccess,
    isError: signInMutation.isError,
    error: signInMutation.error
  };
}
