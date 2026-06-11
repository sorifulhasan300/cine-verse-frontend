import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "./lib/auth-session";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const EXCLUDED_MOVIE_SEGMENTS = new Set(["page", "search", "popular"]);

async function getMoviePricing(
  id: string,
  cookie: string,
): Promise<string | null> {
  try {
    const res = await fetch(`${baseURL}/movie/${id}`, {
      headers: { cookie, origin: APP_URL },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.pricing || null;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSessionFromRequest(request);

  // Auth route redirect
  if (
    session &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    const target = session.user.role === "ADMIN" ? "/admin" : "/user";
    return NextResponse.redirect(new URL(target, request.url));
  }

  // Protected route — not logged in
  if (
    !session &&
    (pathname.startsWith("/user") || pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role mismatch
  if (pathname.startsWith("/user") && session?.user.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  if (pathname.startsWith("/admin") && session?.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  // Movie premium check
  const movieMatch = pathname.match(/^\/movies\/([^\/]+)$/);
  if (
    movieMatch &&
    !EXCLUDED_MOVIE_SEGMENTS.has(movieMatch[1]) &&
    !pathname.includes("/edit")
  ) {
    const userPlan = session?.user?.plan || "FREE";
    if (userPlan === "FREE") {
      const pricing = await getMoviePricing(
        movieMatch[1],
        request.headers.get("cookie") || "",
      );
      if (pricing === "PREMIUM") {
        return NextResponse.redirect(new URL("/pricing", request.url));
      }
    }
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/movies/:path*",
  ],
};
