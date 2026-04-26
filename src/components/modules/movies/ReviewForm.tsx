/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { movieService } from "@/services/movie.service"; // আপনার সার্ভিস মেথড
import { reviewService } from "@/services/review.service";

interface ReviewFormProps {
  movieId: string;
}

const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Please select a rating")
    .max(5, "Rating must be between 1-5"),
  text: z
    .string()
    .min(6, "Review must be at least 6 characters long")
    .max(1000, "Review must be less than 1000 characters"),
});

export function ReviewForm({ movieId }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = reviewSchema.safeParse({ rating, text: text.trim() });

    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    setIsSubmitting(true);

    try {
      const { success, data, message } = await reviewService.createReview({
        movieId,
        rating: validation.data.rating,
        text: validation.data.text,
      });

      if (success) {
        toast.success("Review submitted successfully!");
        setRating(0);
        setText("");
      } else {
        // ব্যাকএন্ড থেকে আসা কাস্টম এরর মেসেজ
        toast.error(message || "Something went wrong");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to connect to server";

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white text-lg">Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Section */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-300">
              Your Rating
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Section */}
          <div className="space-y-2">
            <Textarea
              placeholder="What did you think of the movie?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 resize-none min-h-[100px] focus:ring-red-500"
            />
            <p className="text-[10px] text-slate-500 text-right">
              {text.length}/1000
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold transition-all"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            {isSubmitting ? "Posting..." : "Post Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
