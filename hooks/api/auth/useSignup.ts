import { ENDPOINTS } from "@/api/api-endpoints";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  phone_number: string;
  delivery_address: string;
}

export function useUserSignUp() {
  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpRequest) => {
      return await api.post(ENDPOINTS.AUTH.SIGNUP, data);
    },
  });

  return {
    signUp: signUpMutation.mutateAsync,
    isPending: signUpMutation.isPending,
    isLoaded: signUpMutation.isSuccess,
    isError: signUpMutation.isError,
    error: signUpMutation.error,
  };
}
