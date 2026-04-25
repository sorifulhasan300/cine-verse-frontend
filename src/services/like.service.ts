import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/httpClient";

export interface ToggleLikeRequest {
  movieId: string;
}

export interface ToggleLikeResponse {
  success: boolean;
  data: {
    liked: boolean;
    likeId?: string;
  };
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
        data: response.data,
        message: response.data.liked ? "Movie liked" : "Movie unliked",
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to toggle like";
      return {
        success: false,
        data: { liked: false },
        message: errorMessage,
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