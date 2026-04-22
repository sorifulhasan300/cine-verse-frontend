"use server";
import { api } from "@/lib/httpClient";

export const userService = {
  getSession: async function () {
    try {
      const response = await api.get("/auth/get-session");
      console.log(response, "response form auth service");
      if (response.success) {
        if (response.data === null) {
          return { data: null, error: "cookies not found" };
        }
        return { data: response.data, error: null };
      } else {
        return {
          data: null,
          error:
            response.message || "Server connection failed. Please try again.",
        };
      }
    } catch (error) {
      return {
        data: null,
        error: "Server connection failed. Please try again.",
      };
    }
  },
};
