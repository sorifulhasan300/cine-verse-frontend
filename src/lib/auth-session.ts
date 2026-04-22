import { NextRequest } from "next/server";
import { env } from "./config";
import { session } from "@/types/session.types";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

// ─── Middleware এর ভেতরে use করো ───
export async function getSessionFromRequest(request: NextRequest) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
      headers: {
        // Browser এর cookie টা backend এ forward করছি
        cookie: request.headers.get("cookie") ?? "",
      },
    });

    if (!response.ok) return null;

    const session = await response.json();
    if (!session || !session.user) return null;

    return session;
  } catch {
    return null;
  }
}

// ─── Server Component / Route Handler এ use করো ───
export async function getCurrentUser() {
  try {
    const { headers } = await import("next/headers");
    const headersList = await headers();
    const cookie = headersList.get("cookie") ?? "";

    const response = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
      headers: { cookie },
      // Server Component এ cache বন্ধ রাখা ভালো
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
