import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "./lib/auth-session";

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

  // Protected route এ আছে + session নেই → login এ পাঠাও
  if (
    !session &&
    (pathname.startsWith("/user") || pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // User route এ ADMIN ঢুকলে → admin এ পাঠাও
  if (pathname.startsWith("/user") && session?.user.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Admin route এ USER ঢুকলে → user এ পাঠাও
  if (pathname.startsWith("/admin") && session?.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/login", "/register"],
};
