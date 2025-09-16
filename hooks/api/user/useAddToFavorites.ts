import { ENDPOINTS } from "@/api/api-endpoints";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useAddToFavorites() {
  const addToFavoritesMutation = useMutation({
    mutationFn: async (foodId: string) => {
      return await api.post(ENDPOINTS.USER.ADD_TO_FAVORITES, {
        foodId,
      });
    },
  });

  return {
    addToFavorites: addToFavoritesMutation.mutateAsync,
    isPending: addToFavoritesMutation.isPending,
    isLoaded: addToFavoritesMutation.isSuccess,
    isError: addToFavoritesMutation.isError,
    error: addToFavoritesMutation.error,
  };
}
