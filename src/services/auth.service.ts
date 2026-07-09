/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/lib/config";
const authUrl = "http://localhost:5000/api/v1";

export const authService = {
  verifyEmail: async (otp: string, email: string) => {
    if (!email) {
      throw new Error("Email not found. Please register again.");
    }

    try {
      const response = await fetch(`${authUrl}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data?.message ||
          data?.errorSources?.[0]?.message ||
          "Verification failed";
        throw new Error(errorMessage);
      }

      return data;
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Verification failed. Please check your connection.");
    }
  },
  requestPasswordReset: async (email: string) => {
    if (!email) {
      throw new Error("Email not found. Please register again.");
    }

    try {
      const response = await fetch(`${authUrl}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data?.message || data?.errorSources?.[0]?.message || "Request failed";
        throw new Error(errorMessage);
      }

      return data;
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Request failed. Please check your connection.");
    }
  },
  resetPassword: async (email: string, otp: string, newPassword: string) => {
    console.log("Resetting password with:", { email, otp, newPassword });
    if (!email || !otp || !newPassword) {
      throw new Error("All fields are required.");
    }

    try {
      const response = await fetch(`${authUrl}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data?.message || data?.errorSources?.[0]?.message || "Request failed";
        throw new Error(errorMessage);
      }

      return data;
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Request failed. Please check your connection.");
    }
  },
};
