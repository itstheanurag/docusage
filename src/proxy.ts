import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const PROTECTED_ROUTES = ["/dashboard"];

// Helpers
function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some(
    (route) => route === pathname || pathname.startsWith(route + "/")
  );
}

function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: url.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
      cache: "no-store",
    }
  );

  const isLoggedIn = !!session;

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
