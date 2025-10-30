import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { apiKey } from "better-auth/plugins";
import { admin } from "better-auth/plugins";
import { getDb } from "../db";
import { schema } from "../db/schema";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_URL!,
  basePath: `/api/auth`,

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  advanced: {
    cookiePrefix: "docusage",
    crossSubDomainCookies: {
      enabled: false,
    },
  },

  database: drizzleAdapter(getDb(), {
    provider: "pg",
    schema,
  }),
  logger: {
    level: "debug",
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Optional: You can specify scopes if needed
      // scopes: ["openid", "profile", "email"],
    },
  },

  plugins: [apiKey(), admin()],
});
