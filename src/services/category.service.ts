/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/httpClient";

export interface Category {
  [x: string]: any;
  id: string | number;
  name: string;
  movieCount?: number;
  count?: number;
}

export const categoryService = {
  async getCategories(params?: {
    limit?: number;
    [key: string]: any;
  }): Promise<{
    data: Category[] | null;
    error: any;
  }> {
    try {
      const response = await api.get("/categories", { params });
      // Handle different response structures
      const categories = response.data?.data || response.data || [];
      return {
        data: Array.isArray(categories) ? categories : [],
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.response?.data?.message || "Failed to fetch categories",
      };
    }
  },
};