import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";
import { LoginInput, RegisterInput, User } from "@/types";
import type { User as PrismaUser } from "@prisma/client";
import ms from "ms";

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

function generateToken(userId: string, email: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const rawExpiresIn = process.env.JWT_EXPIRES_IN || "1d";
  const expiresIn = Math.floor(ms(rawExpiresIn as ms.StringValue)! / 1000);
  return jwt.sign({ userId, email }, process.env.JWT_SECRET, { expiresIn });
}

export async function createUser(data: RegisterInput) {
  try {
    const {
      email,
      fullName,
      password,
      provider = "email",
      providerId,
      image,
    } = data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const hashedPassword = password ? await hashPassword(password) : null;

    const user = await prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
        provider,
        providerId,
        image,
      },
    });

    return {
      message: "user created successfully",
      data: buildUserWithoutPassword(user),
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function loginUser(
  data: LoginInput
): Promise<{ user: User; token: string }> {
  try {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      throw new Error("Invalid credentials");
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user.id, user.email);
    return { user: buildUserWithoutPassword(user), token };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}

export async function findUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
}

export async function findUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        image: true,
        provider: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw error;
  }
}

function buildUserWithoutPassword(user: PrismaUser): User {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    emailVerified: user.emailVerified ?? null,
    image: user.image ?? null,
    provider: user.provider ?? null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
