import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { apiKey } from "better-auth/plugins";
import { admin } from "better-auth/plugins";
import { getDb } from "../db";
import { schema } from "../db/schema";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_URL!,
  basePath: `/api/auth`,

  database: drizzleAdapter(getDb(), {
    provider: "pg",
    debugLogs: process.env.NODE_ENV !== "production",
    schema,
  }),

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      scope: ["read:user", "user:email"], // ✅ fixed
      callbackURL: `${process.env.NEXT_PUBLIC_URL}/api/auth/callback/github`,
    },
  },

  plugins: [apiKey(), admin()],
});
