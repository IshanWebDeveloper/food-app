import { ENDPOINTS } from "@/api/api-endpoints";
import { queryKeys } from "@/constants/queryKeys";
import api from "@/lib/axios";
import { CommonResponseDataType, OrderStatus } from "@/types/common";
import { MenuItem } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

interface QueryParams {
  limit?: number;
  status: OrderStatus;
  metric: "quantity" | "revenue";
  startDate: string;
  endDate: string;
}

export interface TopSellingDishReponse extends MenuItem {
  value: number;
}

export function useGetTopSellingDishes(params: QueryParams) {
  const getTopSellingDishes = useQuery({
    queryKey: queryKeys.allDishesByCategories,
    queryFn: async () => {
      const response = await api.get<
        CommonResponseDataType<TopSellingDishReponse[]>
      >(ENDPOINTS.reporting.GET_TOP_SELLING_DISHES, {
        params: params,
      });

      return response.data;
    },

    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  return {
    topSellingDishes: getTopSellingDishes.data,
    refetch: getTopSellingDishes.refetch,
    isPending: getTopSellingDishes.isLoading,
    isLoaded: getTopSellingDishes.isSuccess,
    isError: getTopSellingDishes.isError,
    error: getTopSellingDishes.error,
  };
}
