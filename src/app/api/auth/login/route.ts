import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/lib/auth";
import { z } from "zod";
import { loginSchema } from "@/types";

// Validation schema

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = loginSchema.parse(body);

    // Login user
    const user = await loginUser({
      email: validatedData.email,
      password: validatedData.password,
    });

    // In a real app, you'd create a session/JWT here
    return NextResponse.json(
      {
        message: "Login successful",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
