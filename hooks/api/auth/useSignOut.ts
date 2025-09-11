import { ENDPOINTS } from "@/api/api-endpoints";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export interface SignOutRequest {
  refreshToken: string;
}

export function useUserSignOut() {
  const signOutMutation = useMutation({
    mutationFn: async (data: SignOutRequest) => {
      return await api.post(ENDPOINTS.AUTH.SIGNOUT, data);
    },
  });

  return {
    signOut: signOutMutation.mutateAsync,
    isError: signOutMutation.isError,
    error: signOutMutation.error,
  };
}
