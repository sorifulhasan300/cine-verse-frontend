import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Film, Star, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import { Movie } from "@/types/movie.types";
import Link from "next/link";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterSrc = movie.thumbnailUrl;
  console.log(movie);
  return (
    <Card className="bg-slate-900 border-slate-700 hover:border-slate-600 transition-all duration-300 group">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          {posterSrc ? (
            <Image
              src={posterSrc}
              alt={movie.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              width={400}
              height={300}
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
              <div className="text-center">
                <Film className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-white">Cine Verse</div>
              </div>
            </div>
          )}

          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-black/70 text-white">
              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
              {movie._count?.reviews}
            </Badge>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-white mb-2 line-clamp-1">
          {movie.title}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {movie.duration} min
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(movie.releaseYear).toLocaleDateString()}
          </div>
        </div>
        <Badge
          variant="outline"
          className="mb-3 border-slate-600 text-slate-400"
        >
          {movie.categories[0]?.name}
        </Badge>

        <p className="text-slate-300 text-sm line-clamp-2 mb-4">
          {movie.description}
        </p>

        <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
          <Link href={`/movies/${movie.id}`}>
            <Film className="w-4 h-4 mr-2" />
            Watch Now
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
