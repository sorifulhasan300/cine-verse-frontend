/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/httpClient";
import { User } from "@/types/user.types";

export const userManagementService = {
  async getUsers(page: number = 1, limit: number = 10, search?: string): Promise<{
    data: User[] | null;
    pagination: any;
    error: any;
  }> {
    try {
      const params: any = { page, limit };
      if (search) params.search = search;
      const response = await api.get<User[]>("/manage-users/users", {
        params,
      });
      console.log("users data", response);
      return {
        data: response.data.users || [],
        pagination: response.data.pagination || {},
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        pagination: null,
        error: error.response?.data?.message || "Failed to fetch users",
      };
    }
  },

  async blockUser(userId: string): Promise<{
    success: boolean;
    error: any;
  }> {
    try {
      await api.put(`/manage-users/users/${userId}/block`);
      return {
        success: true,
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to block user",
      };
    }
  },

  async unblockUser(userId: string): Promise<{
    success: boolean;
    error: any;
  }> {
    try {
      await api.put(`/manage-users/users/${userId}/unblock`);
      return {
        success: true,
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to unblock user",
      };
    }
  },

  async deactivateUser(userId: string): Promise<{
    success: boolean;
    error: any;
  }> {
    try {
      await api.put(`/manage-users/users/${userId}/inactive`);
      return {
        success: true,
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to deactivate user",
      };
    }
  },

  async activateUser(userId: string): Promise<{
    success: boolean;
    error: any;
  }> {
    try {
      await api.put(`/manage-users/users/${userId}/active`);
      return {
        success: true,
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to activate user",
      };
    }
  },
};
