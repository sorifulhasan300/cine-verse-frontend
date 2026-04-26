/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { likeService } from "@/services/like.service";

interface LikeButtonProps {
  movieId: string;
  initialLikes: number;
  isInitiallyLiked?: boolean;
}

export function LikeButton({
  movieId,
  initialLikes,
  isInitiallyLiked = false,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(isInitiallyLiked);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleLike = async () => {
    const previousIsLiked = isLiked;
    const previousLikesCount = likesCount;

    setIsLiked(!previousIsLiked);
    setLikesCount((prev) => (!previousIsLiked ? prev + 1 : prev - 1));

    setIsLoading(true);

    try {
      const { success, message } = await likeService.toggleLike({ movieId });
      if (success) {
        setIsLiked(!previousIsLiked);
        toast.success(message || "Action successful");
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      setIsLiked(previousIsLiked);
      setLikesCount(previousLikesCount);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleToggleLike}
      variant="ghost"
      size="sm"
      disabled={isLoading}
      className={`flex items-center gap-2 transition-all duration-300 active:scale-90 ${
        isLiked
          ? "text-red-500 hover:text-red-600 hover:bg-red-500/10"
          : "text-slate-400 hover:text-slate-300 hover:bg-slate-800"
      }`}
    >
      <Heart
        className={`w-4 h-4 transition-all ${
          isLiked ? "fill-current scale-110" : "scale-100"
        } ${isLoading ? "opacity-70" : "opacity-100"}`}
      />
      <span className="font-semibold">{likesCount}</span>
    </Button>
  );
}
