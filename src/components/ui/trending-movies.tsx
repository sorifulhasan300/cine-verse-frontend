"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Film } from "lucide-react";
import {
  popularMoviesService,
  PopularMovie,
} from "@/services/popular-movies.service";
import { MovieCard } from "@/components/ui/movie-card";
import { toast } from "sonner";
import Link from "next/link";
import { Movie } from "@/types/movie.types";

export function TrendingMovies() {
  const [movies, setMovies] = useState<PopularMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await popularMoviesService.getPopularMovies(4);
        if (response.error) {
          toast.error("Failed to load trending movies: " + response.error);
          setError(response.error);
          return;
        }
        setMovies(response.data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load trending movies",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-6 w-32 bg-slate-700 animate-pulse rounded mb-4 mx-auto"></div>
            <div className="h-12 w-64 bg-slate-700 animate-pulse rounded mb-4 mx-auto"></div>
            <div className="h-6 w-96 bg-slate-700 animate-pulse rounded mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-slate-900 border-slate-800">
                <CardContent className="p-0">
                  <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
                    <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center animate-pulse">
                      <Film className="w-12 h-12 text-slate-500" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="h-6 bg-slate-700 animate-pulse rounded mb-2"></div>
                    <div className="h-4 bg-slate-700 animate-pulse rounded mb-3"></div>
                    <div className="h-5 bg-slate-700 animate-pulse rounded w-20"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400 mb-4">
              Failed to load trending movies: {error}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-red-600/10 text-red-400 border-red-600/20"
          >
            🔥 Trending Now
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Most Popular Movies
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Discover what&apos;s capturing audiences worldwide. These movies are
            making waves right now.
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie as Movie} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-slate-600 text-black hover:bg-slate-400 cursor-po hover:text-white px-8"
          >
            <Link href={"/movies"}>View All Trending Movies</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
