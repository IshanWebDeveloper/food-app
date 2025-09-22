import { ENDPOINTS } from "@/api/api-endpoints";
import { queryKeys } from "@/constants/queryKeys";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface getAllDishesByCategoriesResponse {
  data: Datum[];
}

interface Datum {
  title: string;
  data: Dish[];
}

interface Dish {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  calories: number;
  rating: number;
  price: number;
  image_url: string;
  category_id: string;
  restaurant_id: string;
}

export const fetchAllDishesByCategories = async () => {
  const response = await api.get<getAllDishesByCategoriesResponse>(
    ENDPOINTS.dishes.GET_ALL_BY_CATEGORIES,
  );
  return response.data;
};
export function useGetAllDishesByCategories() {
  const getAllDishesByCategories = useQuery({
    queryKey: queryKeys.allDishesByCategories,
    queryFn: fetchAllDishesByCategories,
    staleTime: 1 * 60 * 1000, // 5 minutes
    refetchInterval: 60 * 1000, // 1 minute
    refetchIntervalInBackground: true, // 30 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  return {
    dishesByCategories: getAllDishesByCategories.data?.data || [],
    refetch: getAllDishesByCategories.refetch,
    isPending: getAllDishesByCategories.isLoading,
    isLoaded: getAllDishesByCategories.isSuccess,
    isError: getAllDishesByCategories.isError,
    error: getAllDishesByCategories.error,
  };
}
