import { ENDPOINTS } from "@/api/api-endpoints";
import { queryKeys } from "@/constants/queryKeys";
import api from "@/lib/axios";
import { FoodItem } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function useGetAllFoods() {
  const getAllFoodsQuery = useQuery({
    queryKey: queryKeys.allFoods,
    queryFn: async () => {
      const response = await api.get<FoodItem[]>(ENDPOINTS.FOODS.GET_ALL);
      return response.data;
    },
  });

  return {
    foods: getAllFoodsQuery.data,
    isPending: getAllFoodsQuery.isLoading,
    isLoaded: getAllFoodsQuery.isSuccess,
    isError: getAllFoodsQuery.isError,
    error: getAllFoodsQuery.error,
  };
}
