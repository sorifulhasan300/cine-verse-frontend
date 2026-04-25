"use client";

import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useToggleLike } from "@/services/like.service";
import { toast } from "sonner";
import { useState } from "react";

interface LikeButtonProps {
  movieId: string;
  initialLikes: number;
  isInitiallyLiked?: boolean;
}

export function LikeButton({ movieId, initialLikes, isInitiallyLiked = false }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(isInitiallyLiked);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const toggleLike = useToggleLike();

  const handleToggleLike = () => {
    toggleLike.mutate(
      { movieId },
      {
        onSuccess: (data) => {
          if (data.success) {
            setIsLiked(data.data.liked);
            setLikesCount(prev => data.data.liked ? prev + 1 : prev - 1);
            toast.success(data.message);
          } else {
            toast.error(data.message || "Failed to toggle like");
          }
        },
        onError: () => {
          toast.error("Failed to toggle like");
        },
      }
    );
  };

  return (
    <Button
      onClick={handleToggleLike}
      disabled={toggleLike.isPending}
      variant="ghost"
      size="sm"
      className={`flex items-center gap-2 ${
        isLiked
          ? "text-red-400 hover:text-red-300"
          : "text-slate-400 hover:text-slate-300"
      }`}
    >
      {toggleLike.isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Heart
          className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
        />
      )}
      <span>{likesCount}</span>
    </Button>
  );
}