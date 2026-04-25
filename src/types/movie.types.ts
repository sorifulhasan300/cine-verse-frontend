import { Category } from "./category.types";

export type PricingStatus = "FREE" | "PREMIUM";

export interface MovieCount {
  likes: number;
  reviews: number;
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
