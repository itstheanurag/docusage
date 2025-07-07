import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { logoutUser } from "@/lib/auth";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret";

export async function POST() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Not authenticated");

    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };

    await logoutUser(payload.userId);

    (await cookies()).delete("token");

    return NextResponse.json({ message: "Logout successful" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
