"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Loader2 } from "lucide-react";
import { useCreateReview } from "@/services/review.service";
import { toast } from "sonner";
import { z } from "zod";

interface ReviewFormProps {
  movieId: string;
}

// Zod schema for review validation
const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5, "Rating must be between 1-5"),
  text: z.string().min(6, "Review must be at least 6 characters long").max(1000, "Review must be less than 1000 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export function ReviewForm({ movieId }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewFormData, string>>>({});

  const createReview = useCreateReview();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate form data
    const formData = {
      rating,
      text: text.trim(),
    };

    const validationResult = reviewSchema.safeParse(formData);

    if (!validationResult.success) {
      // Extract and set validation errors
      const fieldErrors: Partial<Record<keyof ReviewFormData, string>> = {};
      validationResult.error.errors.forEach((error) => {
        // Safely access the first path element
        const field = error.path?.[0] as keyof ReviewFormData;
        if (field) {
          fieldErrors[field] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    createReview.mutate(
      {
        movieId,
        rating: validationResult.data.rating,
        text: validationResult.data.text,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success("Review submitted successfully!");
            setRating(0);
            setText("");
            setErrors({});
          } else {
            // Handle backend validation errors
            if (data.message.includes("Validation Error")) {
              toast.error("Please check your input and try again");
            } else {
              toast.error(data.message || "Failed to submit review");
            }
          }
        },
        onError: (error: unknown) => {
          // Handle network or other errors
          let errorMessage = "Failed to submit review";

          if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            errorMessage = axiosError.response?.data?.message || errorMessage;
          }

          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating Stars */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Rating *
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-colors hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-600 hover:text-yellow-400/50"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-slate-400">
                {rating} star{rating !== 1 ? "s" : ""}
              </p>
            )}
            {errors.rating && (
              <p className="text-sm text-red-400">{errors.rating}</p>
            )}
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <label
              htmlFor="review-text"
              className="text-sm font-medium text-slate-300"
            >
              Your Review *
            </label>
            <Textarea
              id="review-text"
              placeholder="Share your thoughts about this movie..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 resize-none ${
                errors.text ? "border-red-500 focus:border-red-500" : ""
              }`}
              rows={4}
            />
            <div className="flex justify-between">
              {errors.text && (
                <p className="text-sm text-red-400">{errors.text}</p>
              )}
              <p className="text-sm text-slate-500 ml-auto">
                {text.length}/1000 characters
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={createReview.isPending}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {createReview.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}