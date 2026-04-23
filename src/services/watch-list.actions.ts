"use server";

import { serverApi } from "@/lib/serverHttpClient";
import { ServiceResponse } from "@/types/watch-list.types";

export async function removeFromWatchListAction(
  movieId: string,
): Promise<ServiceResponse<{ success: boolean }>> {
  try {
    await serverApi.post("/watchlist/remove", { movieId });
    return {
      data: { success: true },
      error: null,
    };
  } catch (error) {
    console.error("Failed to remove from watchlist:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to remove from watchlist";
    return {
      data: null,
      error: errorMessage,
    };
  }
}

export async function addToWatchListAction(
  movieId: string,
): Promise<ServiceResponse<{ success: boolean }>> {
  try {
    await serverApi.post("/watchlist", { movieId });
    return {
      data: { success: true },
      error: null,
    };
  } catch (error) {
    console.error("Failed to add to watchlist:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to add to watchlist";
    return {
      data: null,
      error: errorMessage,
    };
  }
}
