import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const PROTECTED_ROUTES = ["/dashboard"];

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some(
    (route) => route === pathname || pathname.startsWith(route + "/"),
  );
}

function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  const sessionCookie =
    request.cookies.getAll().find((c) => c.name.endsWith("session_token")) ??
    getSessionCookie(request);

  const isLoggedIn = !!sessionCookie;

  if (isLoggedIn && isPublicRoute(path)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (!isLoggedIn && isProtectedRoute(path)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
