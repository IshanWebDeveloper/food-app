import { ENDPOINTS } from "@/api/api-endpoints";
import { queryKeys } from "@/constants/queryKeys";
import api from "@/lib/axios";
import { FoodItem } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function useGetFoodById(id: string) {
  const getAllFoodsQuery = useQuery({
    queryKey: queryKeys.foodById(id),
    queryFn: async () => {
      const response = await api.get<FoodItem>(ENDPOINTS.FOODS.GET_BY_ID(id));
      return response.data;
    },
    enabled: !!id,
  });

  return {
    food: getAllFoodsQuery.data,
    isPending: getAllFoodsQuery.isLoading,
    isLoaded: getAllFoodsQuery.isSuccess,
    isError: getAllFoodsQuery.isError,
    error: getAllFoodsQuery.error,
  };
}
