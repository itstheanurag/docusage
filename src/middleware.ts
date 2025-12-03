import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  // Check for any session token cookie (handling prefixes)
  const allCookies = request.cookies.getAll();
  const sessionCookie = allCookies.find((c) =>
    c.name.endsWith("session_token"),
  );

  const isLoggedIn = !!sessionCookie || !!getSessionCookie(request);

  const url = request.nextUrl.clone();

  // Redirect logged-in users away from public auth pages
  if (
    isLoggedIn &&
    (url.pathname === "/" || url.pathname.startsWith("/auth"))
  ) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Protect dashboard pages
  if (!isLoggedIn && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};
