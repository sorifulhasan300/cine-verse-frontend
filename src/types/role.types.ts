export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface PopularMovie {
  id: string | number;
  title: string;
  year: number;
  rating: number;
  duration: string;
  genre: string;
  image?: string;
  description?: string;
}
