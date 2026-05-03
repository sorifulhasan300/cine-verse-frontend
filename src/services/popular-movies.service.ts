/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/httpClient";
import { PopularMovie } from "@/types/role.types";

export const popularMoviesService = {
  async getPopularMovies(limit?: number): Promise<{
    data: PopularMovie[] | null;
    error: any;
  }> {
    try {
      const params = limit ? { limit } : {};
      const response = await api.get<PopularMovie[]>("/movie/most-popular", {
        params,
      });

      // Handle different response structures
      const movies =
        (response as any).data?.data || (response as any).data || [];
      return {
        data: Array.isArray(movies) ? movies : [],
        error: null,
      };
    } catch (error: any) {
      console.error("Error fetching popular movies:", error);
      return {
        data: null,
        error:
          error.response?.data?.message || "Failed to fetch popular movies",
      };
    }
  },
};
