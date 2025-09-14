import { ENDPOINTS } from "@/api/api-endpoints";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export interface EditUserProfileRequest {
  email: string;
  password: string;
  name: string;
}

export function useEditUserProfile() {
  const editUserProfileMutation = useMutation({
    mutationFn: async (data: EditUserProfileRequest) => {
      return await api.put(ENDPOINTS.AUTH.EDIT_PROFILE, data);
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
