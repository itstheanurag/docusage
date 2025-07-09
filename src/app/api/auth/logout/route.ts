import { NextResponse } from "next/server";
import { logoutUser } from "@/lib/auth";


export async function POST() {
  try {
    await logoutUser()
    return NextResponse.json({ message: "Logout successful" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
