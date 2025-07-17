import { NextResponse } from "next/server";
import { getServerUser } from "@/lib/auth/jwt";


export async function GET() {
  try {
    const user =  await getServerUser()
    console.log("user from me",user);
  return NextResponse.json({data: user,  message: "User found Successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
