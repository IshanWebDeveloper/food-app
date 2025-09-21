import { ENDPOINTS } from "@/api/api-endpoints";
import { queryKeys } from "@/constants/queryKeys";
import api from "@/lib/axios";
import { MenuItem } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function useGetDishById(id: string) {
  const getDishByIdQuery = useQuery({
    queryKey: queryKeys.dishById(id),
    queryFn: async () => {
      const response = await api.get<MenuItem>(ENDPOINTS.dishes.GET_BY_ID(id));
      return response.data;
    },
    enabled: !!id,
  });

  return {
    dish: getDishByIdQuery.data,
    isPending: getDishByIdQuery.isLoading,
    isLoaded: getDishByIdQuery.isSuccess,
    isError: getDishByIdQuery.isError,
    error: getDishByIdQuery.error,
  };
}
