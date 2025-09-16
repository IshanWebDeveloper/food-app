import { ENDPOINTS } from "@/api/api-endpoints";
import { queryKeys } from "@/constants/queryKeys";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useGetUserProfile() {
  const getUserProfileQuery = useQuery({
    queryKey: queryKeys.userProfile,
    queryFn: async () => {
      const response = await api.get(ENDPOINTS.USER.GET_PROFILE);
      return response.data;
    },
  });

  return {
    userProfile: getUserProfileQuery.data,
    isPending: getUserProfileQuery.isLoading,
    isLoaded: getUserProfileQuery.isSuccess,
    isError: getUserProfileQuery.isError,
    error: getUserProfileQuery.error,
  };
}
