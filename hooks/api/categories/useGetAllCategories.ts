import { ENDPOINTS } from "@/api/api-endpoints";
import { queryKeys } from "@/constants/queryKeys";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface GetAllCategoryResponse {
  id: string;
  name: string;
}

export function useGetAllCategories() {
  const getAllCategoriesQuery = useQuery({
    queryKey: queryKeys.allCategories,
    queryFn: async () => {
      const response = await api.get<GetAllCategoryResponse[]>(
        ENDPOINTS.CATEGORIES.GET_ALL,
      );
      return response.data;
    },
  });

  return {
    categories: getAllCategoriesQuery.data,
    isPending: getAllCategoriesQuery.isLoading,
    isLoaded: getAllCategoriesQuery.isSuccess,
    isError: getAllCategoriesQuery.isError,
    error: getAllCategoriesQuery.error,
  };
}
