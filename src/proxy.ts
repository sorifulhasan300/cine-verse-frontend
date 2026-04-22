// import { NextRequest, NextResponse } from "next/server";
// import { authClient } from "./lib/auth-client";
// import { userService } from "./services/session.service";

import { NextRequest } from "next/server";

// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const { data: session } = await userService.getSession();

//   console.log("user session", session);

//   if (!session) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (
//     !session &&
//     (pathname.startsWith("/user") || pathname.startsWith("/admin"))
//   ) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (
//     session &&
//     (pathname.startsWith("/login") || pathname.startsWith("/register"))
//   ) {
//     const targetPath = session.user.role === "ADMIN" ? "/admin" : "/user";
//     return NextResponse.redirect(new URL(targetPath, request.url));
//   }

//   if (pathname.startsWith("/admin") && session?.user.role !== "ADMIN") {
//     return NextResponse.redirect(new URL("/user", request.url));
//   }

//   if (pathname.startsWith("/user") && session?.user.role === "ADMIN") {
//     return NextResponse.redirect(new URL("/admin", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/user/:path*", "/admin/:path*", "/login", "/register"],
// };

export async function proxy(request: NextRequest) {
  // Implement your proxy logic here
}
