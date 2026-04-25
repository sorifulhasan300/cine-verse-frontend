import { Category } from "./category.types";
import { WatchListItem } from "./watch-list.types";

export type PricingStatus = "FREE" | "PREMIUM";

export interface MovieCount {
  likes: number;
  reviews: number;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export interface Like {
  id: string;
  userId: string;
  movieId: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  text: string;
  reviewId: string;
  parentId?: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  replies?: Comment[];
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  releaseYear: string;
  director: string;
  cast: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  pricing: PricingStatus;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
  _count: MovieCount;
}

export interface MovieDetails extends Movie {
  reviews: Review[];
  likes: Like[];
  watchLists: WatchListItem[];
}
