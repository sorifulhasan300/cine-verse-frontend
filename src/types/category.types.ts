export type CategoryFormData = {
  name: string;
  description?: string;
};

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  movieCount?: number;
  count?: number;
}
