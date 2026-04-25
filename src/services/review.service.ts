import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/httpClient";
import { Review } from "@/types/movie.types";

export interface CreateReviewRequest {
  movieId: string;
  rating: number;
  text: string;
}

export interface CreateReviewResponse {
  success: boolean;
  data: Review;
  message?: string;
}

export const reviewService = {
  async createReview(reviewData: CreateReviewRequest): Promise<CreateReviewResponse> {
    try {
      const response = await api.post<Review>("/review", reviewData);
      return {
        success: true,
        data: response.data,
        message: "Review submitted successfully",
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to submit review";
      return {
        success: false,
        data: {} as Review,
        message: errorMessage,
      };
    }
  },
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewService.createReview,
    onSuccess: (data, variables) => {
      if (data.success) {
        // Invalidate movie details queries to refetch with new review
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