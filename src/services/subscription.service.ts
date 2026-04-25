/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/httpClient";

export interface SubscriptionPlan {
  plan: "MONTHLY" | "YEARLY";
}

export interface PaymentSessionDetails {
  id: string;
  status: string;
  planType: "MONTHLY" | "YEARLY";
  amount: number;
  currency: string;
  createdAt?: string;
  expiresAt?: string;
}

export const subscriptionService = {
  async createCheckoutSession(subscriptionData: SubscriptionPlan): Promise<{
    data: string | null;
    error: any;
    success: boolean;
  }> {
    try {
      const response = await api.post(
        "/subscriptions/create-checkout-session",
        subscriptionData,
      );
      return {
        success: true,
        data: response.data as string,
        error: null,
      };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errorSources?.[0]?.message ||
        error.message ||
        "Failed to create checkout session";
      return {
        success: false,
        data: null,
        error: errorMessage,
      };
    }
  },

  async checkSubscriptionStatus(): Promise<{
    success: boolean;
    data: any;
    message: string;
    error: any;
  }> {
    try {
      const response = await api.get("/subscriptions/check-status");
      const resData = response.data as string | any;
      return {
        success: resData.status.success,
        data: resData.status,
        message: resData.message || "",
        error: null,
      };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errorSources?.[0]?.message ||
        error.message ||
        "Failed to check subscription status";

      return {
        success: false,
        data: null,
        message: errorMessage,
        error: errorMessage,
      };
    }
  },
};
