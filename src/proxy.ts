import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  const sessionCookie =
    request.cookies.getAll().find((c) => c.name.endsWith("session_token")) ??
    getSessionCookie(request);

  const isLoggedIn = !!sessionCookie;
  /**
   * 🔴 Rule 2: Non-logged-in users should NOT access dashboard pages.
   */
  if (!isLoggedIn && url.pathname.startsWith("/dashboard")) {
    if (url.pathname !== "/login") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
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
