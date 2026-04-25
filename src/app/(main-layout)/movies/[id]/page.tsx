import React from "react";
import { MovieDetailsClient } from "@/components/modules/movies/MovieDetailsClient";
import { movieService } from "@/services/movie.service";
import { QueryClient, dehydrate } from "@tanstack/react-query";

interface MovieDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {
  const { id } = await params;
  console.log("id:", id);
  const queryClient = new QueryClient();
  const queryKey = ["movie", id];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      const result = await movieService.getMovieDetails(id);
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch movie details");
      }
      if (!result.data) {
        throw new Error("Movie not found");
      }
      return result.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="min-h-screen bg-slate-950">
      <MovieDetailsClient id={id} dehydratedState={dehydratedState} />
    </div>
  );
}
