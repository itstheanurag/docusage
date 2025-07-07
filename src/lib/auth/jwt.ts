import jwt from "jsonwebtoken";
import * as cookie from "cookie"; // ✅ Correct import

export type JwtPayload = {
  userId: string;
  username: string;
  iat?: number;
  exp?: number;
};

/**
 * Parses the "authToken" cookie from a raw cookie header
 */
export function parseAuthCookie(
  cookieHeader: string | undefined
): string | null {
  if (!cookieHeader) return null;

  const cookies = cookie.parse(cookieHeader);
  return cookies.authToken || null;
}

/**
 * Verifies a JWT token and returns the decoded payload if valid
 */
export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
