export type Category = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryFormData = {
  name: string;
  description?: string;
};