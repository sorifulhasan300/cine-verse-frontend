export interface WatchListItem {
  id: string;
  movieId: string;
  movie: {
    id: string;
    title: string;
    posterUrl: string;
    genre: string[];
    rating: number;
    status: string;
  };
  addedAt: string;
}

export interface ServiceResponse<T> {
  data: T | null;
  error: string | null;
}
