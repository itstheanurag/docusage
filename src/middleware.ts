import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/better-auth/auth";

export async function middleware(request: NextRequest) {
  // const session = await auth.getSession(request);
  // if (!session) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
