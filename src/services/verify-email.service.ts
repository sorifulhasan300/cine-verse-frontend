import { api } from "@/lib/httpClient";
import { AxiosError } from "axios";

export const verifyEmail = async (otp: string, email: string) => {
  if (!email) {
    throw new Error("Email not found. Please register again.");
  }
  try {
    const response = await api.post("/v1/auth/verify-email", { email, otp });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Verification failed");
    }
    throw new Error("Verification failed");
  }
};
