import { loginUser } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log(email, password)
    const { user, refreshToken } = await loginUser({ email, password });
    (await cookies()).set("token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ message: "Login successful", user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
