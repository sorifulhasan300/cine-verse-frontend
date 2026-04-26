"use client";

import React, { useState } from "react";

import { WatchListItem } from "@/types/watch-list.types";
import { MovieCard } from "@/components/ui/movie-card";
import { Movie } from "@/types/movie.types";

interface WatchListGridProps {
  watchList: WatchListItem[];
}

export function WatchListGrid({
  watchList: initialWatchList,
}: WatchListGridProps) {
  const [watchList, setWatchList] = useState(initialWatchList);
  console.log("watchList move", watchList);
  const handleRemoveFromWatchList = (movieId: string) => {
    setWatchList((prev) => prev.filter((item) => item.movieId !== movieId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-red-400">My watch List</h2>
        <span className="text-gray-400">{watchList.length} movies</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {watchList?.map((movie) => (
          <MovieCard
            key={movie.movieId}
            movie={movie.movie as unknown as Movie}
            showRemoveFromWatchList
            onRemoveFromWatchList={handleRemoveFromWatchList}
          />
        ))}
      </div>
    </div>
  );
}
