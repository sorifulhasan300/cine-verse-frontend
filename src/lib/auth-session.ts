import { NextRequest } from "next/server";
import { env } from "./config";
import { session } from "@/types/session.types";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;
const APP_URL = env.NEXT_PUBLIC_APP_URL;

export async function getSessionFromRequest(request: NextRequest) {
  try {
    // cookie না থাকলে আগেই return — unnecessary call বন্ধ করো
    const cookieHeader = request.headers.get("cookie") ?? "";
    if (!cookieHeader.includes("better-auth.session_token")) {
      return null;
    }

    const response = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
      headers: {
        cookie: cookieHeader,
        origin: APP_URL,
      },
      // cache করো — একই request এ বারবার call হলে session clear হওয়ার chance বাড়ে
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!data || !data.user) return null;

    return data;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const { headers } = await import("next/headers");
    const headersList = await headers();
    const cookie = headersList.get("cookie") ?? "";

    if (!cookie.includes("better-auth.session_token")) return null;

    const response = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
      headers: {
        cookie,
        origin: APP_URL,
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const session = await response.json();
    if (!session || !session.user) return null;

    return session as session;
  } catch {
    return null;
  }
}
