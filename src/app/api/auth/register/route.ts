
import { registerUser } from "@/lib/auth";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const link = randomUUID();
    const { name, email, password } = await req.json();
    const user = await registerUser({ name, email, password, link });
    return NextResponse.json({ message: "User registered successfuly", user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
