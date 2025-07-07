
import { registerUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const link = "fejgfioerjfewfwoef]qio-fm3";
    const { name, email, password } = await req.json();

    console.log("Calling register user");
    const user = await registerUser({ name, email, password, link });

    return NextResponse.json({ message: "User registered", user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
