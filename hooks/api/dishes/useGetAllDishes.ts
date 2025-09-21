import { ENDPOINTS } from "@/api/api-endpoints";
import { queryKeys } from "@/constants/queryKeys";
import api from "@/lib/axios";
import { MenuItem } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function useGetAllDishes() {
  const getAllDishesQuery = useQuery({
    queryKey: queryKeys.allDishes,
    queryFn: async () => {
      const response = await api.get<MenuItem[]>(ENDPOINTS.dishes.GET_ALL);
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  return {
    dishes: [...(getAllDishesQuery.data || [])],
    refetch: getAllDishesQuery.refetch,
    isPending: getAllDishesQuery.isLoading,
    isLoaded: getAllDishesQuery.isSuccess,
    isError: getAllDishesQuery.isError,
    error: getAllDishesQuery.error,
  };
}
