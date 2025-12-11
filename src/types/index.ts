import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  email: z.email("Invalid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().optional(),
  provider: z.string().optional(),
  providerId: z.string().optional(),
  image: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

// User type based on your Prisma model
export type User = {
  id: string;
  email: string;
  fullName: string;
  emailVerified?: Date | null;
  image?: string | null;
  provider?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// Session type
export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
};

// API Response types
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// Auth response types
export type AuthResponse = {
  user: User;
  token?: string;
};

// Error response type
export type ErrorResponse = {
  error: string;
  message?: string;
};

export type DisplayApiKey = {
  id: string;
  name: string | null;
  key: string;
  prefix: string | null;
  start: string | null;
  createdAt: Date;
  updatedAt: Date;
  enabled: boolean;
  expiresAt: Date | null;
  refillInterval: number | null;
  refillAmount: number | null;
  lastRefillAt: Date | null;
  rateLimitEnabled: boolean;
  rateLimitTimeWindow: number;
  rateLimitMax: number;
  requestCount: number;
  remaining: number | null;
  lastRequest: Date | null;
  permissions: string | null;
  metadata: string | null;
};

export enum BuilderType {
  INVOICE = "INVOICE",
  FORM = "FORM",
  DOCUMENT = "DOCUMENT",
}
