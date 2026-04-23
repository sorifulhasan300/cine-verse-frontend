"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { WatchListItem } from "@/types/watch-list.types";
import { removeFromWatchListAction } from "@/services/watch-list.actions";

interface WatchListGridProps {
  watchList: WatchListItem[];
}

export function WatchListGrid({
  watchList: initialWatchList,
}: WatchListGridProps) {
  const [watchList, setWatchList] = useState(initialWatchList);

  const handleRemove = async (movieId: string, movieTitle: string) => {
    const { data, error } = await removeFromWatchListAction(movieId);

    if (error) {
      toast.error("Failed to remove from watchlist", {
        description: error,
      });
      return;
    }

    if (data?.success) {
      // Remove from local state
      setWatchList((prev) => prev.filter((item) => item.movieId !== movieId));
      toast.success("Removed from watch List", {
        description: `${movieTitle} has been removed`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-red-400">My watch List</h2>
        <span className="text-gray-400">{watchList.length} movies</span>
      </div>

      {watchList?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Your watch List is empty</p>
          <p className="text-gray-500 mt-2">
            Start adding movies to your watch List!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {watchList?.map((item) => (
            <div
              key={item.id}
              className="bg-black/20 backdrop-blur-sm border border-red-500/20 rounded-lg overflow-hidden hover:border-red-500/40 transition-colors"
            >
              <div className="aspect-[2/3] relative">
                <Image
                  src={item.movie.posterUrl || "/placeholder-movie.jpg"}
                  alt={item.movie.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="bg-black/50 hover:bg-red-600/80 text-white rounded-full p-2"
                    onClick={() => handleRemove(item.movieId, item.movie.title)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white text-lg mb-2 line-clamp-2">
                  {item.movie.title}
                </h3>
                <div className="flex flex-wrap gap-1 mb-2">
                  {(item.movie.genre || []).slice(0, 2).map((genre) => (
                    <span
                      key={genre}
                      className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-yellow-400">★ {item.movie.rating}</span>
                  <span className="text-gray-400">
                    Added {new Date(item.addedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
