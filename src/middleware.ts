import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const allCookies = request.cookies.getAll();
  const sessionCookie = allCookies.find((c) =>
    c.name.endsWith("session_token")
  );

  const isLoggedIn = !!sessionCookie || !!getSessionCookie(request);

  const url = request.nextUrl.clone();

  const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  const isAuthRoute = authRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  // Redirect logged-in users away from public auth pages and home page
  if (isLoggedIn && (url.pathname === "/" || isAuthRoute)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  } else if (!isLoggedIn && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/dashboard/:path*",
  ],
};
