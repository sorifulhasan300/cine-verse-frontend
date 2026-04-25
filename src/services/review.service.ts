/* eslint-disable @typescript-eslint/no-explicit-any */
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
  data: Review | null;
  message?: string;
}

export const reviewService = {
  async createReview(
    reviewData: CreateReviewRequest,
  ): Promise<CreateReviewResponse> {
    try {
      await api.post("/review", reviewData);
      return {
        success: true,
        data: null,
        message: "Review submitted successfully",
      };
    } catch (error: any) {
      // Axios error handling
      const backendMessage = error.response?.data?.message;
      const errorSourceMessage =
        error.response?.data?.errorSources?.[0]?.message;

      return {
        success: false,
        data: null,
        message:
          errorSourceMessage ||
          backendMessage ||
          error.message ||
          "Failed to submit review",
      };
    }
  },
};
