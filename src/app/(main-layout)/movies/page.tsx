import React, { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { MoviesClient } from "@/components/modules/movies/MoviesClient";
import { movieService } from "@/services/movie.service";
import { QueryClient, dehydrate } from "@tanstack/react-query";

interface MoviesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function MoviesLoading() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-red-600/10 text-red-400 border-red-600/20"
            >
              🎬 Movie Collection
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              All Movies
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Explore our complete collection of movies. From blockbusters to
              indie gems, find your next favorite film.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">Loading movies...</p>
      </div>
    </div>
  );
}

export default async function AllMoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams;

  const page = parseInt((params.page as string) || "1");
  const limit = 20;
  const searchTerm = (params.search as string) || "";
  const sort = (params.sort as string) || "title";
  const sortOrder = (params.order as "asc" | "desc") || "asc";
  const category = (params.category as string) || "";

  const queryClient = new QueryClient();
  const queryKey = [
    "movies",
    page,
    limit,
    searchTerm,
    sort,
    sortOrder,
    category,
  ];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      const result = await movieService.getMovies({
        page,
        limit,
        searchTerm: searchTerm || undefined,
        sort,
        sortOrder,
        category: category || undefined,
      });
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch movies");
      }
      return result;
    },
    staleTime: 5 * 60 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-red-600/10 text-red-400 border-red-600/20"
            >
              🎬 Movie Collection
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              All Movies
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Explore our complete collection of movies. From blockbusters to
              indie gems, find your next favorite film.
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<MoviesLoading />}>
        <MoviesClient dehydratedState={dehydratedState} />
      </Suspense>
    </div>
  );
}
