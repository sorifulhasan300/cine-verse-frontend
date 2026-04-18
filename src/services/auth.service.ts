import { api, ApiResponse } from "@/lib/httpClient";
import { SignInData, SignUpData } from "@/types/auth.types";

export async function signUp(data: SignUpData) {
  try {
    const res = await api.post("/auth/sign-up/email", data);
    console.log("res in signup service page", res);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function signIn(data: SignInData) {
  try {
    const res = await api.post("/auth/sign-in/email", data);
    console.log("res in service page", res);
    return res;
  } catch (error) {
    throw error;
  }
}

export const authService = {
  signUp,
  signIn,
};
