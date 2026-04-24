import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Star, Film } from "lucide-react";

const trendingMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    duration: "152 min",
    genre: "Action",
    image: "/api/placeholder/300/450",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham..."
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    duration: "148 min",
    genre: "Sci-Fi",
    image: "/api/placeholder/300/450",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology..."
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    duration: "169 min",
    genre: "Adventure",
    image: "/api/placeholder/300/450",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival..."
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    duration: "154 min",
    genre: "Crime",
    image: "/api/placeholder/300/450",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine..."
  }
];

export function TrendingMovies() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-red-600/10 text-red-400 border-red-600/20">
            🔥 Trending Now
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Most Popular Movies
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Discover what&apos;s capturing audiences worldwide. These movies are making waves right now.
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trendingMovies.map((movie) => (
            <Card key={movie.id} className="bg-slate-900 border-slate-800 hover:border-red-600/50 transition-all duration-300 group">
              <CardContent className="p-0">
                {/* Movie Poster */}
                <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
                  <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <Film className="w-12 h-12 text-slate-500" />
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button size="lg" className="bg-red-600 hover:bg-red-700">
                      <Play className="w-5 h-5 mr-2" />
                      Watch Now
                    </Button>
                  </div>
                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-black/80 rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-semibold text-white">{movie.rating}</span>
                  </div>
                </div>

                {/* Movie Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span>{movie.duration}</span>
                  </div>
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {movie.genre}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8"
          >
            View All Trending Movies
          </Button>
        </div>
      </div>
    </section>
  );
}