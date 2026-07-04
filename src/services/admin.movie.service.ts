/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/httpClient";
import { MovieResponse } from "./movie.service";
import { MovieFormData } from "@/types/createMovie.types";

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
      const response = await api.patch<MovieResponse>(
        `/movie/admin/${id}`,
        movieData,
      );
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

  async deleteMovie(id: string): Promise<{
    data: any | null;
    error: any;
  }> {
    try {
      const response = await api.delete(`/movie/admin/${id}`);
      return {
        data: response.data,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error.response?.data?.message || "Failed to delete movie",
      };
    }
  },
};
