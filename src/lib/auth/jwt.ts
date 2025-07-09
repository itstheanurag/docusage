// lib/auth/session.ts
import jwt from "jsonwebtoken";
import * as cookie from "cookie";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export type JwtPayload = {
  id: string;
  name: string;
  email: string;
  iat?: number;
  exp?: number;
};

export async function getServerUser(): Promise<JwtPayload | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  return verifyJwt(token);
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch {
    return null;
  }
}
