import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "./lib/auth-session";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

async function getMoviePricing(
  id: string,
  cookie: string,
): Promise<string | null> {
  try {
    const res = await fetch(`${baseURL}/movie/${id}`, {
      headers: {
        cookie,
        origin: APP_URL,
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.pricing || null;
  } catch {
    return null;
  }
}

function stripSetCookie(response: NextResponse): NextResponse {
  response.headers.delete("set-cookie");
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await getSessionFromRequest(request);

  if (
    session &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    const targetPath = session.user.role === "ADMIN" ? "/admin" : "/user";
    return stripSetCookie(
      NextResponse.redirect(new URL(targetPath, request.url)),
    );
  }

  if (
    !session &&
    (pathname.startsWith("/user") || pathname.startsWith("/admin"))
  ) {
    return stripSetCookie(
      NextResponse.redirect(new URL("/login", request.url)),
    );
  }

  if (pathname.startsWith("/user") && session?.user.role === "ADMIN") {
    return stripSetCookie(
      NextResponse.redirect(new URL("/admin", request.url)),
    );
  }

  if (pathname.startsWith("/admin") && session?.user.role !== "ADMIN") {
    return stripSetCookie(NextResponse.redirect(new URL("/user", request.url)));
  }

  const movieMatch = pathname.match(/^\/movies\/([^\/]+)$/);
  if (movieMatch && movieMatch[1] !== "page" && !pathname.includes("/edit")) {
    const movieId = movieMatch[1];
    const userPlan = session?.user?.plan || "FREE";
    if (userPlan === "FREE" || !userPlan) {
      const pricing = await getMoviePricing(
        movieId,
        request.headers.get("cookie") || "",
      );
      if (pricing === "PREMIUM") {
        return stripSetCookie(
          NextResponse.redirect(new URL("/pricing", request.url)),
        );
      }
    }
  }

  return stripSetCookie(NextResponse.next());
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
