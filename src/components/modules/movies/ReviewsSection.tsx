/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateComment } from "@/services/comment.service";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, MessageCircle, Loader2, Send } from "lucide-react";
import { Review } from "@/types/movie.types";
import { toast } from "sonner";
import { z } from "zod";

interface ReviewsSectionProps {
  reviews: Review[];
  movieId: string;
}

const commentSchema = z.object({
  text: z
    .string()
    .min(3, "Comment must be at least 3 characters long")
    .max(500, "Comment must be less than 500 characters"),
});

export function ReviewsSection({ reviews, movieId }: ReviewsSectionProps) {
  const [replyingTo, setReplyingTo] = useState<{ reviewId: string, targetId: string, type: 'review' | 'comment' } | null>(null);
  const [commentText, setCommentText] = useState("");
  const queryClient = useQueryClient();
  const createCommentMutation = useCreateComment();

  const handleCommentSubmit = async () => {
    if (!replyingTo) return;

    const validation = commentSchema.safeParse({ text: commentText.trim() });

    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    try {
      const response = await createCommentMutation.mutateAsync({
        reviewId: replyingTo.reviewId,
        parentId: replyingTo.type === 'comment' ? replyingTo.targetId : undefined,
        text: validation.data.text,
      });

      if (response.success) {
        toast.success("Comment posted successfully!");
        setCommentText("");
        setReplyingTo(null);
        queryClient.invalidateQueries({ queryKey: ["movie", movieId] });
      } else {
        toast.error(response.message || "Failed to post comment");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errorSources?.[0]?.message ||
        error.response?.data?.message ||
        "Something went wrong";

      toast.error(errorMessage);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-slate-600"
        }`}
      />
    ));
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 bg-slate-900/50 rounded-xl border border-slate-800">
        <p className="text-slate-400">
          No reviews yet. Be the first to review!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <Card
          key={review.id}
          className="bg-slate-900 border-slate-800 overflow-hidden"
        >
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border border-slate-700">
                <AvatarFallback className="bg-slate-800 text-slate-200">
                  {review.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      {review.user.name}
                    </h4>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {review.comment}
                </p>

                {/* Comments */}
                {review.comments && review.comments.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {review.comments.map((comment) => (
                      <div key={comment.id} className="ml-8 p-3 bg-slate-800/30 rounded-lg border-l-2 border-slate-600">
                        <div className="flex gap-3">
                          <Avatar className="w-8 h-8 border border-slate-600">
                            <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                              {comment.user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-medium text-slate-200 text-sm">{comment.user.name}</h5>
                              <span className="text-[10px] text-slate-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-slate-300 text-sm mb-2">{comment.text}</p>
                            <button
                              onClick={() => {
                                setReplyingTo(replyingTo?.targetId === comment.id ? null : { reviewId: review.id, targetId: comment.id, type: 'comment' });
                                setCommentText("");
                              }}
                              className="text-xs text-slate-400 hover:text-red-500"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                        {/* Nested replies if any */}
                        {comment.replies && comment.replies.map((reply) => (
                          <div key={reply.id} className="ml-8 mt-3 p-2 bg-slate-800/50 rounded border-l border-slate-500">
                            <div className="flex gap-2">
                              <Avatar className="w-6 h-6 border border-slate-600">
                                <AvatarFallback className="bg-slate-700 text-slate-300 text-xs">
                                  {reply.user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h6 className="font-medium text-slate-200 text-xs">{reply.user.name}</h6>
                                  <span className="text-[10px] text-slate-500">{new Date(reply.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-slate-300 text-xs">{reply.text}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* Interaction Bar */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setReplyingTo(replyingTo?.targetId === review.id ? null : { reviewId: review.id, targetId: review.id, type: 'review' });
                      setCommentText("");
                    }}
                    className="flex items-center text-xs font-medium text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 mr-1.5" />
                    {replyingTo?.targetId === review.id ? "Cancel" : "Reply"}
                  </button>
                </div>

                {/* Comment Input Area */}
                {replyingTo?.reviewId === review.id && (
                  <div className="mt-4 space-y-3 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 animate-in fade-in slide-in-from-top-2">
                    <Textarea
                      placeholder="Write your reply..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="bg-slate-900 border-slate-700 text-sm text-white placeholder:text-slate-500 min-h-[80px] focus:ring-1 focus:ring-red-500"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] text-slate-500">
                        {commentText.length}/500 characters
                      </p>
                      <Button
                        size="sm"
                        onClick={() => handleCommentSubmit()}
                        disabled={createCommentMutation.isPending || commentText.length < 3}
                        className="bg-red-600 hover:bg-red-700 h-8 px-4"
                      >
                        {createCommentMutation.isPending ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Send className="w-3 h-3 mr-2" />
                        )}
                        Post
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
