/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useQuery,
  HydrationBoundary,
  DehydratedState,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { movieService } from "@/services/movie.service";
import { MovieDetails } from "@/types/movie.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Star, Clock, Calendar, User, Users } from "lucide-react";
import { MoviePlayer } from "./MoviePlayer";
import { authClient } from "@/lib/auth-client";

interface MovieDetailsClientProps {
  id: string;
  dehydratedState: DehydratedState;
}

export function MovieDetailsClient({
  id,
  dehydratedState,
}: MovieDetailsClientProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const userPlan = (session?.user as any)?.plan || "FREE";

  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const result = await movieService.getMovieDetails(id);
      if (!result.success) {
        if (result.redirectTo) {
          router.push(result.redirectTo);
          throw new Error("Redirecting...");
        }
        throw new Error(result.error || "Failed to fetch movie details");
      }
      if (!result.data) {
        throw new Error("Movie not found");
      }
      return result.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
  });

  const movie = data as MovieDetails | undefined;

  useEffect(() => {
    if (error?.message === "Redirecting...") {
      // Prevent showing error UI during redirect
      return;
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (error && error.message !== "Redirecting...") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">
            {(error as Error).message}
          </p>
          <Button onClick={() => router.back()} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-400">Movie not found</p>
      </div>
    );
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Video Section */}
        <div className="mb-12">
          {movie.pricing === "PREMIUM" && userPlan === "FREE" ? (
            <div className="bg-slate-800 p-8 text-center rounded-xl border border-dashed border-slate-600">
              <h3 className="text-xl font-bold text-white mb-2">
                This is a Premium Movie
              </h3>
              <p className="text-slate-400 mb-4">
                Please upgrade your plan to watch this content.
              </p>
              <Button onClick={() => router.push("/pricing")}>
                Upgrade Now
              </Button>
            </div>
          ) : (
            <MoviePlayer url={movie.videoUrl} />
          )}
        </div>

        {/* Movie Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
                <Badge
                  variant={
                    movie.pricing === "PREMIUM" ? "default" : "secondary"
                  }
                  className={
                    movie.pricing === "PREMIUM"
                      ? "bg-red-600/10 text-red-400 border-red-600/20"
                      : ""
                  }
                >
                  {movie.pricing}
                </Badge>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                {movie.description}
              </p>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>{new Date(movie.releaseYear).getFullYear()}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4" />
                <span>{movie.duration} min</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <User className="w-4 h-4" />
                <span>{movie.director}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Users className="w-4 h-4" />
                <span>{movie.cast}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {movie.categories.map((category) => (
                <Badge
                  key={category.id}
                  variant="outline"
                  className="text-slate-300"
                >
                  {category.name}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{movie._count.likes} likes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{movie._count.reviews} reviews</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Movie Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Release Year</span>
                    <span className="text-white">
                      {new Date(movie.releaseYear).getFullYear()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration</span>
                    <span className="text-white">{movie.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Director</span>
                    <span className="text-white">{movie.director}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cast</span>
                    <span className="text-white">{movie.cast}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pricing</span>
                    <Badge
                      variant={
                        movie.pricing === "PREMIUM" ? "default" : "secondary"
                      }
                      className={
                        movie.pricing === "PREMIUM"
                          ? "bg-red-600/10 text-red-400 border-red-600/20"
                          : ""
                      }
                    >
                      {movie.pricing}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
