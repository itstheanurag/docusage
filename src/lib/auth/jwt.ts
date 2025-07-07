// lib/auth/session.ts
import jwt from "jsonwebtoken";
import * as cookie from "cookie";

export type JwtPayload = {
  userId: string;
  username: string;
  iat?: number;
  exp?: number;
};

export function parseAuthCookie(
  cookieHeader: string | undefined
): string | null {
  if (!cookieHeader) return null;

  const cookies = cookie.parse(cookieHeader);
  return cookies.token || null; // Use your actual cookie name here
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
}

export function getLoggedInUserFromHeader(
  cookieHeader: string | undefined
): JwtPayload | null {
  const token = parseAuthCookie(cookieHeader);
  if (!token) return null;
  return verifyJwt(token);
}
