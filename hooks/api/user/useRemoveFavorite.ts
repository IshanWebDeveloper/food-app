import { ENDPOINTS } from "@/api/api-endpoints";
import { queryKeys } from "@/constants/queryKeys";
import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRemoveFromFavorites() {
  const queryClient = useQueryClient();
  const removeFromFavoritesMutation = useMutation({
    mutationFn: async (foodId: string) => {
      return await api.post(ENDPOINTS.USER.REMOVE_FROM_FAVORITES, {
        foodId,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [queryKeys.userFavoriteFoods, queryKeys.allDishes],
      });
    },
  });

  return {
    removeFromFavorites: removeFromFavoritesMutation.mutateAsync,
    isPending: removeFromFavoritesMutation.isPending,
    isLoaded: removeFromFavoritesMutation.isSuccess,
    isError: removeFromFavoritesMutation.isError,
    error: removeFromFavoritesMutation.error,
  };
}
