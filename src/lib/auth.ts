import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export interface CreateUserData {
  email: string;
  fullName: string;
  password?: string;
  provider?: string;
  providerId?: string;
  image?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Create user
export async function createUser(data: CreateUserData) {
  try {
    const {
      email,
      fullName,
      password,
      provider = "email",
      providerId,
      image,
    } = data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // Hash password if provided
    const hashedPassword = password ? await hashPassword(password) : null;

    // Create user
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

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// Login user
export async function loginUser(data: LoginData) {
  try {
    const { email, password } = data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      throw new Error("Invalid credentials");
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}

// Find user by email
export async function findUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
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
    console.error("Error finding user:", error);
    throw error;
  }
}

// Find user by ID
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
