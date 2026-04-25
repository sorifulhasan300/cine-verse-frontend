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
  data: Comment;
  message?: string;
}

export const commentService = {
  async createComment(commentData: CreateCommentRequest): Promise<CreateCommentResponse> {
    try {
      const response = await api.post<Comment>("/comments", commentData);
      return {
        success: true,
        data: response.data,
        message: "Comment posted successfully",
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to post comment";
      return {
        success: false,
        data: {} as Comment,
        message: errorMessage,
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
        // Invalidate movie details queries to refetch with new comment
        queryClient.invalidateQueries({
          queryKey: ["movie"],
        });
        // Could also invalidate specific review queries if they exist
        queryClient.invalidateQueries({
          queryKey: ["review", variables.reviewId],
        });
      }
    },
  });
};