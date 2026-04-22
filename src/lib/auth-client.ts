import { createAuthClient } from "better-auth/react";
import { env } from "./config";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
});

export const { useSession, signIn, signOut, getSession } = authClient;
