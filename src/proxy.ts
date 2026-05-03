import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "./lib/auth-session";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

async function getMoviePricing(
  id: string,
  cookie: string,
): Promise<string | null> {
  try {
    const res = await fetch(`${baseURL}/movie/${id}`, {
      headers: {
        cookie,
      },
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

  if (
    session &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    const targetPath = session.user.role === "ADMIN" ? "/admin" : "/user";
    return NextResponse.redirect(new URL(targetPath, request.url));
  }

  if (
    !session &&
    (pathname.startsWith("/user") || pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/user") && session?.user.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (pathname.startsWith("/admin") && session?.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  // Check for premium movie access
  const movieMatch = pathname.match(/^\/movies\/([^\/]+)$/);
  if (movieMatch && movieMatch[1] !== "page" && !pathname.includes("/edit")) {
    // exclude list page and edit
    const movieId = movieMatch[1];
    const userPlan = session?.user?.plan || "FREE";
    if (userPlan === "FREE" || !userPlan) {
      const pricing = await getMoviePricing(
        movieId,
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
