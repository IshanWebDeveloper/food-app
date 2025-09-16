import { ENDPOINTS } from "@/api/api-endpoints";
import { queryKeys } from "@/constants/queryKeys";
import api from "@/lib/axios";
import { CommonResponseDataType } from "@/types/common";
import { FoodItem } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function useGetUserFavoriteFoods() {
  const getUserFavoriteFoodsQuery = useQuery({
    queryKey: queryKeys.userFavoriteFoods,
    queryFn: async () => {
      const response = await api.get<CommonResponseDataType<FoodItem[]>>(
        ENDPOINTS.USER.GET_FAVORITES
      );
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 1, // refetch every 1 minute
  });

  return {
    userFavoriteFoods: getUserFavoriteFoodsQuery.data,
    refetch: getUserFavoriteFoodsQuery.refetch,
    isPending: getUserFavoriteFoodsQuery.isLoading,
    isLoaded: getUserFavoriteFoodsQuery.isSuccess,
    isError: getUserFavoriteFoodsQuery.isError,
    error: getUserFavoriteFoodsQuery.error,
  };
}
