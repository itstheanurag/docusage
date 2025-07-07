import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Register user
export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      link: crypto.randomUUID(),
    },
  });

  // You may want to set a session/cookie here

  return NextResponse.json({ message: "User registered", user: { id: user.id, email: user.email, name: user.name } });
}

// Login user
export async function PUT(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // You may want to set a session/cookie here

  return NextResponse.json({ message: "Login successful", user: { id: user.id, email: user.email, name: user.name } });
}

// Logout user
export async function DELETE(req: NextRequest) {
  // For stateless APIs, logout is usually handled on the client by deleting tokens/cookies.
  // If using httpOnly cookies, you can clear them here.

  // Example: clear a cookie (if you set one)
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("token", "", { maxAge: 0 });

  return response;
}