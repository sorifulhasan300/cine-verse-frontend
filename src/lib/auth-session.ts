import { NextRequest } from "next/server";
import { env } from "./config";
import { session } from "@/types/session.types";

const FRONTEND_URL = env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const SESSION_COOKIE_NAMES = [
  "__Secure-better-auth.session_token",
  "better-auth.session_token",
];

export async function getSessionFromRequest(
  request: NextRequest,
): Promise<session | null> {
  try {
    const cookieHeader = request.headers.get("cookie") ?? "";

    const hasSessionCookie = SESSION_COOKIE_NAMES.some((name) =>
      cookieHeader.includes(name),
    );
    if (!hasSessionCookie) return null;

    const response = await fetch(`${FRONTEND_URL}/api/auth/get-session`, {
      headers: {
        cookie: cookieHeader,
        origin: FRONTEND_URL,
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!data || !data.user) return null;

    return data as session;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<session | null> {
  try {
    const { headers } = await import("next/headers");
    const headersList = await headers();
    const cookie = headersList.get("cookie") ?? "";

    const hasSessionCookie = SESSION_COOKIE_NAMES.some((name) =>
      cookie.includes(name),
    );
    if (!hasSessionCookie) return null;

    const response = await fetch(`${FRONTEND_URL}/api/auth/get-session`, {
      headers: {
        cookie,
        origin: FRONTEND_URL,
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
