import { ENDPOINTS } from "@/api/api-endpoints";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface UpdateRefreshTokenRequest {
  refreshToken: string;
}

export interface UpdateRefreshTokenResponse {
  success: boolean;
  refreshToken?: string;
  error?: string;
}

/**
 * Custom hook to update the refresh token via API using react-query.
 * @returns An object with mutation methods and state.
 */
export function useUpdateRefreshToken() {
  const mutation = useMutation({
    mutationFn: async (
      data: UpdateRefreshTokenRequest
    ): Promise<UpdateRefreshTokenResponse> => {
      try {
        const response = await axios.post(ENDPOINTS.AUTH.REFRESH_TOKEN, {
          refreshToken: data.refreshToken,
        });
        return {
          success: true,
          refreshToken: response.data.refreshToken,
        };
      } catch (error: any) {
        return {
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
    },
  });

  return {
    updateRefreshToken: mutation.mutateAsync,
    isPending: mutation.isPending,
    isLoaded: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
}
