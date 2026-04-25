/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/httpClient";
import { movieValidationSchema } from "@/zod/movie.validation";
import z from "zod";
import { MovieResponse } from "./movie.service";
export type MovieFormData = z.infer<typeof movieValidationSchema>;

export const adminMovieService = {
  async getMoviesAdmin(params?: {
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
    success?: boolean;
  }> {
    try {
      const response = await api.get<MovieResponse>("/movie/admin", { params });
      console.log("movies data", response);
      return {
        success: true,
        data: response.data.data || [],
        pagination: response.data.meta || {},
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
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
};
