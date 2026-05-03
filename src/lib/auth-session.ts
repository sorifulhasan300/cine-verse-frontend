import { NextRequest } from "next/server";
import { env } from "./config";
import { session } from "@/types/session.types";

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

export async function getSessionFromRequest(request: NextRequest) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
      credentials: "include",
    });

    if (!response.ok) return null;

    const session = await response.json();
    if (!session || !session.user) return null;

    return session;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const { headers } = await import("next/headers");
    const headersList = await headers();
    const cookie = headersList.get("cookie") ?? "";

    const response = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
      headers: { cookie },
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) return null;

    const session = await response.json();
    if (!session || !session.user) return null;

    return session as session;
  } catch {
    return null;
  }
}
