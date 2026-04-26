import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, BookmarkCheck } from "lucide-react";
import { watchListService } from "@/services/watch-list.service";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface WatchListButtonProps {
  movieId: string;
  initialIsInWatchList?: boolean;
  onToggle?: (isInWatchList: boolean) => void;
}

export function WatchListButton({
  movieId,
  initialIsInWatchList = false,
  onToggle,
}: WatchListButtonProps) {
  const [isInWatchList, setIsInWatchList] = useState(initialIsInWatchList);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleToggleWatchList = async () => {
    setIsLoading(true);
    try {
      const result = await watchListService.toggleWatchList(movieId);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      const newState = result.data?.isInWatchList || false;
      setIsInWatchList(newState);
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      toast.success(
        newState
          ? "Added to watchlist"
          : "Removed from watchlist"
      );
      onToggle?.(newState);
    } catch (error) {
      toast.error("Failed to update watchlist");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isInWatchList ? "default" : "outline"}
      size="sm"
      onClick={handleToggleWatchList}
      disabled={isLoading}
      className={`flex items-center gap-2 ${
        isInWatchList
          ? "bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
          : "border-slate-600 hover:border-slate-500"
      }`}
    >
      {isInWatchList ? (
        <BookmarkCheck className="w-4 h-4 fill-current" />
      ) : (
        <BookmarkPlus className="w-4 h-4" />
      )}
      {isInWatchList ? "In Watchlist" : "Add to Watchlist"}
    </Button>
  );
}