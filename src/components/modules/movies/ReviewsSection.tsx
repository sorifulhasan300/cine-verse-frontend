"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, MessageCircle, Loader2, Send } from "lucide-react";
import { Review } from "@/types/movie.types";
import { useCreateComment } from "@/services/comment.service";
import { toast } from "sonner";
import { z } from "zod";

interface ReviewsSectionProps {
  reviews: Review[];
}

// Zod schema for comment validation
const commentSchema = z.object({
  text: z
    .string()
    .min(3, "Comment must be at least 3 characters long")
    .max(500, "Comment must be less than 500 characters"),
});

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [commentErrors, setCommentErrors] = useState<string>("");

  const createComment = useCreateComment();

  const handleCommentSubmit = (reviewId: string, parentId?: string) => {
    // Clear previous errors
    setCommentErrors("");

    // Validate comment
    const validationResult = commentSchema.safeParse({
      text: commentText.trim(),
    });

    if (!validationResult.success) {
      const errorMessage =
        validationResult.error.issues?.[0]?.message || "Invalid comment";
      setCommentErrors(errorMessage);
      return;
    }

    createComment.mutate(
      {
        reviewId,
        parentId,
        text: validationResult.data.text,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success("Comment posted successfully!");
            setCommentText("");
            setCommentingOn(null);
            setCommentErrors("");
          } else {
            // Handle backend validation errors
            if ((data.message ?? "").includes("Validation Error")) {
              toast.error("Please check your comment and try again");
            } else {
              toast.error(data.message || "Failed to post comment");
            }
          }
        },
        onError: (error: unknown) => {
          // Handle network or other errors
          let errorMessage = "Failed to post comment";

          if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as {
              response?: { data?: { message?: string } };
            };
            errorMessage = axiosError.response?.data?.message || errorMessage;
          }

          toast.error(errorMessage);
        },
      },
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-slate-600"
        }`}
      />
    ));
  };

  if (reviews.length === 0) {
    return (
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-6 text-center">
          <p className="text-slate-400">
            No reviews yet. Be the first to review!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <Card key={review.id} className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarFallback>
                  {review.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-medium text-white">
                    {review.user.name}
                  </span>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-slate-300 mb-4">{review.comment}</p>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setCommentingOn(
                      commentingOn === review.id ? null : review.id,
                    )
                  }
                  className="text-slate-400 hover:text-slate-300 p-0 h-auto mb-4"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Add Comment
                </Button>

                {commentingOn === review.id && (
                  <div className="space-y-2 mb-4">
                    <Textarea
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 resize-none ${
                        commentErrors
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      rows={3}
                    />
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleCommentSubmit(review.id)}
                          disabled={createComment.isPending}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {createComment.isPending ? (
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          ) : (
                            <Send className="w-3 h-3 mr-1" />
                          )}
                          Comment
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setCommentingOn(null);
                            setCommentText("");
                            setCommentErrors("");
                          }}
                          className="text-slate-400 hover:text-slate-300"
                        >
                          Cancel
                        </Button>
                      </div>
                      <div className="flex flex-col items-end">
                        {commentErrors && (
                          <p className="text-sm text-red-400 mb-1">
                            {commentErrors}
                          </p>
                        )}
                        <p className="text-xs text-slate-500">
                          {commentText.length}/500
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Comments */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-slate-300">
                    Comments
                  </h4>
                  {/* We'll need to fetch comments for each review - for now showing placeholder */}
                  <p className="text-slate-500 text-sm">
                    Comments feature will be implemented with API integration
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
