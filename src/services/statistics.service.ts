/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverApi } from "@/lib/serverHttpClient";
import { UserStatistics, AdminStatistics } from "@/types/dashboard.types";

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

  async getAdminStatistics(): Promise<{
    data: AdminStatistics["data"] | null;
    error: any;
  }> {
    try {
      const response = await serverApi.get("/statics/admin-statics");
      return {
        data: response.data as AdminStatistics["data"],
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error:
          error.response?.data?.message || "Failed to fetch admin statistics",
      };
    }
  },
};
