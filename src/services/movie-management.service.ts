/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/httpClient";
import { movieValidationSchema } from "@/zod/movie.validation";
import z from "zod";

export type MovieFormData = z.infer<typeof movieValidationSchema>;

export const movieManagementService = {
  async getMovies(params?: {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sort?: string;
    sortOrder?: "asc" | "desc";
    [key: string]: any;
  }): Promise<{
    data: any[] | null;
    pagination: any;
    error: any;
  }> {
    try {
      const response = await api.get("/movie/admin", { params });
      console.log("movies data", response);
      return {
        data: response.data.data || [],
        pagination: response.data.meta || {},
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        pagination: null,
        error: error.response?.data?.message || "Failed to fetch movies",
      };
    }
  },

  async createMovie(movieData: MovieFormData): Promise<{
    data: any | null;
    error: any;
  }> {
    try {
      const response = await api.post("/movie/create-movie", movieData);
      return {
        data: response.data,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.response?.data?.message || "Failed to create movie",
      };
    }
  },

  async updateMovie(
    id: string,
    movieData: Partial<MovieFormData>,
  ): Promise<{
    data: any | null;
    error: any;
  }> {
    try {
      const response = await api.put(`/movie/admin/${id}`, movieData);
      return {
        data: response.data,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.response?.data?.message || "Failed to update movie",
      };
    }
  },

  async getCategories(): Promise<{
    data: any[] | null;
    error: any;
  }> {
    try {
      const response = await api.get("/categories");
      return {
        data: response.data || [],
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
