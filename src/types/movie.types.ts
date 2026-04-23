export type Movie = {
  id: string;
  title: string;
  genre: string[];
  releaseDate: string;
  director: string;
  cast: string[];
  description: string;
  posterUrl: string;
  trailerUrl?: string;
  duration: number; // in minutes
  rating: number; // e.g., 0-10
  status: MovieStatus;
  createdAt: string;
  updatedAt: string;
};

export enum MovieStatus {
  AVAILABLE = "AVAILABLE",
  COMING_SOON = "COMING_SOON",
  UNAVAILABLE = "UNAVAILABLE",
}