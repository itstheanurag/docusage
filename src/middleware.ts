import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const cookies = getSessionCookie(request);
  const url = request.nextUrl.clone();

  // Redirect logged-in users away from public pages
  const publicPages = ["/", "/auth"];
  if (cookies && publicPages.includes(url.pathname)) {
    url.pathname = "/dashboard"; // redirect to dashboard
    return NextResponse.redirect(url);
  }

  // Protect dashboard pages
  const protectedPages = ["/dashboard"];
  if (!cookies && protectedPages.includes(url.pathname)) {
    url.pathname = "/auth/login"; // redirect to login
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};
