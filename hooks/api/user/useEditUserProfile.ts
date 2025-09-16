import { ENDPOINTS } from "@/api/api-endpoints";
import api from "@/lib/axios";
import { User } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export function useEditUserProfile(userId: string) {
  const editUserProfileMutation = useMutation({
    mutationFn: async (data: Partial<User>) => {
      return await api.put(ENDPOINTS.AUTH.EDIT_PROFILE(userId), data);
    },
  });

  return {
    editProfile: editUserProfileMutation.mutateAsync,
    isPending: editUserProfileMutation.isPending,
    isLoaded: editUserProfileMutation.isSuccess,
    isError: editUserProfileMutation.isError,
    error: editUserProfileMutation.error,
  };
}
