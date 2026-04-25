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
  const resolvedParams = await params;

  if (!resolvedParams?.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Invalid movie ID</p>
          <p className="text-slate-400">The movie ID is missing or invalid.</p>
        </div>
      </div>
    );
  }

  const { id } = resolvedParams;
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
