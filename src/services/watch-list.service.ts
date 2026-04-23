import { serverApi } from "@/lib/serverHttpClient";
import {
  WatchListItem,
  ServiceResponse,
} from "@/types/watch-list.types";

export const watchListService = {
  async getMyWatchList(): Promise<ServiceResponse<WatchListItem[]>> {
    try {
      const response = await serverApi.get<WatchListItem[]>(
        "/watchlist/my-watchlist",
      );
      return {
        data: response.data || [],
        error: null,
      };
    } catch (error) {
      console.error("Failed to fetch watchlist:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch watchlist";
      return {
        data: null,
        error: errorMessage,
      };
    }
  },
};
