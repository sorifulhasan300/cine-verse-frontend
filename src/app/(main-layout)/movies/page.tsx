import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Film, Star, Clock, Calendar } from "lucide-react";

export default function AllMoviesPage() {
  // Mock data - in a real app, this would come from an API
  const movies = [
    {
      id: 1,
      title: "Inception",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400",
      rating: 8.8,
      duration: "148 min",
      year: 2010,
      genre: "Sci-Fi",
      description: "A thief who steals corporate secrets through dream-sharing technology."
    },
    {
      id: 2,
      title: "The Dark Knight",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      rating: 9.0,
      duration: "152 min",
      year: 2008,
      genre: "Action",
      description: "Batman faces his greatest challenge yet as the Joker wreaks havoc."
    },
    {
      id: 3,
      title: "Interstellar",
      poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400",
      rating: 8.6,
      duration: "169 min",
      year: 2014,
      genre: "Sci-Fi",
      description: "A team of explorers travel through a wormhole in space."
    },
    // Add more movies as needed
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-red-600/10 text-red-400 border-red-600/20">
              🎬 Movie Collection
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              All Movies
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Explore our complete collection of movies. From blockbusters to indie gems, find your next favorite film.
            </p>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <Card key={movie.id} className="bg-slate-900 border-slate-700 hover:border-slate-600 transition-all duration-300 group">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {movie.rating}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-white mb-2 line-clamp-1">{movie.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {movie.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {movie.year}
                  </div>
                </div>
                <Badge variant="outline" className="mb-3 border-slate-600 text-slate-400">
                  {movie.genre}
                </Badge>
                <p className="text-slate-300 text-sm line-clamp-2 mb-4">
                  {movie.description}
                </p>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Film className="w-4 h-4 mr-2" />
                  Watch Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-slate-600 hover:bg-slate-800 text-slate-300">
            Load More Movies
          </Button>
        </div>
      </div>
    </div>
  );
}