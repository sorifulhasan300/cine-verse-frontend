import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/httpClient";
import { Comment } from "@/types/movie.types";

export interface CreateCommentRequest {
  reviewId: string;
  parentId?: string;
  text: string;
}

export interface CreateCommentResponse {
  success: boolean;
  message?: string;
}

export const commentService = {
  async createComment(
    commentData: CreateCommentRequest,
  ): Promise<CreateCommentResponse> {
    try {
      await api.post("/comments", commentData);
      return {
        success: true,
        message: "Comment posted successfully",
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const backendMessage = error.response?.data?.message;
      const errorSourceMessage =
        error.response?.data?.errorSources?.[0]?.message;

      return {
        success: false,
        message:
          errorSourceMessage || backendMessage || "Failed to post comment",
      };
    }
  },
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentService.createComment,
    onSuccess: (data, variables) => {
      if (data.success) {
        // Note: We need movieId to invalidate the correct query
        // This will be handled in the component where we have access to movieId
      }
    },
  });
};
