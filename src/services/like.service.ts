/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/httpClient";

export interface ToggleLikeRequest {
  movieId: string;
}

export interface ToggleLikeResponse {
  success: boolean;
  message?: string;
}

export const likeService = {
  async toggleLike(likeData: ToggleLikeRequest): Promise<ToggleLikeResponse> {
    try {
      const response = await api.post<{
        liked: boolean;
        likeId?: string;
      }>("/likes/toggle-like", likeData);
      return {
        success: true,
        message: response.message ? "Movie liked" : "Movie unliked",
      };
    } catch (error: any) {
      const backendMessage = error.response?.data?.message;
      const errorSourceMessage =
        error.response?.data?.errorSources?.[0]?.message;

      return {
        success: false,
        message:
          backendMessage || errorSourceMessage || "Failed to toggle like",
      };
    }
  },
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeService.toggleLike,
    onSuccess: (data, variables) => {
      if (data.success) {
        // Invalidate movie details queries to update like status
        queryClient.invalidateQueries({
          queryKey: ["movie", variables.movieId],
        });
        // Invalidate movies list queries
        queryClient.invalidateQueries({
          queryKey: ["movies"],
        });
      }
    },
  });
};
