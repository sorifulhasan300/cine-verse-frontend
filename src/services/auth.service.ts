/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/lib/config";
const authUrl = env.NEXT_PUBLIC_AUTH_URL;

export const authService = {
  verifyEmail: async (otp: string, email: string) => {
    if (!email) {
      throw new Error("Email not found. Please register again.");
    }

    try {
      const response = await fetch(`${authUrl}/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
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
      const response = await fetch(`${authUrl}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
    if (!email || !otp || !newPassword) {
      throw new Error("All fields are required.");
    }

    try {
      const response = await fetch(`${authUrl}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
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
