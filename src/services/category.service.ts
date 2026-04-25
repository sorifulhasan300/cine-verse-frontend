/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/httpClient";
import { Category } from "@/types/category.types";

export const categoryService = {
  async getCategories(params?: {
    limit?: number;
    [key: string]: any;
  }): Promise<{
    data: Category[] | null;
    error: any;
    success?: boolean;
  }> {
    try {
      type CategoryServiceResponse = { data?: Category[] } | Category[];
      const response = await api.get<CategoryServiceResponse>("/categories", {
        params,
      });
      const responseData = response.data;
      // Handle different response structures
      const categories = Array.isArray(responseData)
        ? responseData
        : responseData.data || [];
      return {
        data: Array.isArray(categories) ? categories : [],
        error: null,
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || "Failed to fetch categories",
      };
    }
  },
};
