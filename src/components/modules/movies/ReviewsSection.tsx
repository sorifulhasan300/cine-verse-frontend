/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, MessageCircle, Loader2, Send, X } from "lucide-react";
import { Review } from "@/types/movie.types";
import { toast } from "sonner";
import { z } from "zod";
import { commentService } from "@/services/comment.service";

interface ReviewsSectionProps {
  reviews: Review[];
}

const commentSchema = z.object({
  text: z
    .string()
    .min(3, "Comment must be at least 3 characters long")
    .max(500, "Comment must be less than 500 characters"),
});

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async (reviewId: string) => {
    const validation = commentSchema.safeParse({ text: commentText.trim() });

    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await commentService.createComment({
        reviewId,
        text: validation.data.text,
      });

      if (response.success) {
        toast.success("Comment posted successfully!");
        setCommentText("");
        setCommentingOn(null);
      } else {
        toast.error(response.message || "Failed to post comment");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errorSources?.[0]?.message ||
        error.response?.data?.message ||
        "Something went wrong";

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
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

                {/* Interaction Bar */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setCommentingOn(
                        commentingOn === review.id ? null : review.id,
                      );
                      setCommentText("");
                    }}
                    className="flex items-center text-xs font-medium text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 mr-1.5" />
                    {commentingOn === review.id ? "Cancel" : "Reply"}
                  </button>
                </div>

                {/* Comment Input Area */}
                {commentingOn === review.id && (
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
                        onClick={() => handleCommentSubmit(review.id)}
                        disabled={isSubmitting || commentText.length < 3}
                        className="bg-red-600 hover:bg-red-700 h-8 px-4"
                      >
                        {isSubmitting ? (
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
