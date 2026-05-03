/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/httpClient";
import { Category, CategoryFormData } from "@/types/category.types";

export const categoryManagementService = {
  async getCategories(params?: {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sort?: string;
    sortOrder?: "asc" | "desc";
    [key: string]: any;
  }): Promise<{
    data: Category[] | null;
    pagination: any;
    error: any;
  }> {
    try {
      const response = await api.get("/categories", { params });
      return {
        data: (response.data as any)?.data || [],
        pagination: (response.data as any)?.meta || {},
        error: null,
      };
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      return {
        data: null,
        pagination: null,
        error: error.response?.data?.message || "Failed to fetch categories",
      };
    }
  },

  async createCategory(categoryData: CategoryFormData): Promise<{
    data: Category | null;
    error: any;
  }> {
    try {
      const response = await api.post(
        "/categories/create-category",
        categoryData,
      );
      return {
        data: response.data as Category,
        error: null,
      };
    } catch (error: any) {
      console.error("Error creating category:", error);
      return {
        data: null,
        error: error.response?.data?.message || "Failed to create category",
      };
    }
  },

  async updateCategory(
    id: string,
    categoryData: Partial<CategoryFormData>,
  ): Promise<{
    data: Category | null;
    error: any;
  }> {
    try {
      const response = await api.put(`/categories/${id}`, categoryData);
      return {
        data: response.data as Category,
        error: null,
      };
    } catch (error: any) {
      console.error("Error updating category:", error);
      return {
        data: null,
        error: error.response?.data?.message || "Failed to update category",
      };
    }
  },

  async deleteCategory(id: string): Promise<{
    success: boolean;
    error: any;
  }> {
    try {
      await api.delete(`/categories/${id}`);
      return {
        success: true,
        error: null,
      };
    } catch (error: any) {
      console.error("Error deleting category:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to delete category",
      };
    }
  },
};
