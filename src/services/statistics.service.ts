/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverApi } from "@/lib/serverHttpClient";

export interface UserStatistics {
  success: boolean;
  message: string;
  data: {
    personalStats: {
      raw: {
        watchList: number;
        likes: number;
        reviews: number;
        comments: number;
      };
      barChart: {
        labels: string[];
        data: number[];
        chartData: Array<{
          label: string;
          value: number;
        }>;
      };
    };
    subscription: null;
    activity: {
      reviewsByMonth: {
        labels: string[];
        data: number[];
        chartData: Array<{
          label: string;
          value: number;
        }>;
      };
    };
  };
}
export const statisticsService = {
  async getUserStatistics(): Promise<{
    data: UserStatistics["data"] | null;
    error: any;
  }> {
    try {
      const response = await serverApi.get("/statics/user-statics");
      return {
        data: response.data as UserStatistics["data"],
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error:
          error.response?.data?.message || "Failed to fetch user statistics",
      };
    }
  },
};
