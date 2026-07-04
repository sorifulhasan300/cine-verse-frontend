export type PricingType = "FREE" | "PREMIUM";

export interface MovieFormData {
  title: string;
  description: string;
  releaseYear: string; // ISO date string
  director: string;
  cast: string;
  videoUrl: string;
  thumbnailUrl: string;
  pricing: PricingType;
  categoryIds: string[];
}
