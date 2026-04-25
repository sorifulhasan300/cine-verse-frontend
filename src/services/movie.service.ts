/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/httpClient";
import { movieValidationSchema } from "@/zod/movie.validation";
import z from "zod";
import { MovieDetails } from "@/types/movie.types";

export interface MovieResponse {
  data: any[];
  meta: any;
}

export const movieService = {
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
    success?: boolean;
  }> {
    try {
      const response = await api.get<MovieResponse>("/movie", { params });
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

  async getMovieDetails(id: string): Promise<{
    data: MovieDetails | null;
    error: string | null;
    success: boolean;
    redirectTo?: string;
  }> {
    try {
      const response = await api.get(`/movie/${id}`);
      return {
        success: true,
        data: response.data as MovieDetails,
        error: null,
      };
    } catch (error: any) {
      const errorData = error.response?.data;
      if (errorData?.redirectTo) {
        return {
          success: false,
          data: null,
          error: errorData.message,
          redirectTo: errorData.redirectTo,
        };
      }
      return {
        success: false,
        data: null,
        error: errorData?.message || "Failed to fetch movie details",
      };
    }
  },
};
