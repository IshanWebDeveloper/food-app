import { ENDPOINTS } from "@/api/api-endpoints";
import { queryKeys } from "@/constants/queryKeys";
import api from "@/lib/axios";
import { CommonResponseDataType } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { tr } from "zod/v4/locales";

export function useIsFoodFavorite(foodId: string) {
  const isFoodFavoriteQuery = useQuery({
    queryKey: [queryKeys.isFoodFavorite(foodId)],
    queryFn: async () => {
      const response = await api.post<CommonResponseDataType<boolean>>(
        ENDPOINTS.USER.IS_FOOD_FAVORITE,
        {
          foodId,
        }
      );
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  return {
    isFoodFavorite: isFoodFavoriteQuery.data,
    refetch: isFoodFavoriteQuery.refetch,
    isPending: isFoodFavoriteQuery.isLoading,
    isLoaded: isFoodFavoriteQuery.isSuccess,
    isError: isFoodFavoriteQuery.isError,
    error: isFoodFavoriteQuery.error,
  };
}
