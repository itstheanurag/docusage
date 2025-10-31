import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { apiKey, bearer, multiSession, openAPI } from "better-auth/plugins";
import { admin } from "better-auth/plugins";
import { getDb } from "../db";
import { schema } from "../db/schema";
import { nextCookies } from "better-auth/next-js";

// import { resend } from "@/lib/resend";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_URL!,
  basePath: `/api/auth`,

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
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

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  // forgotPassword: {
  //   enabled: true,
  //   sendResetEmail: async ({
  //     email,
  //     resetURL,
  //   }: {
  //     email: string;
  //     resetURL: string;
  //   }) => {
  //     await resend.emails.send({
  //       from: "Docusage <no-reply@yourdomain.com>",
  //       to: email,
  //       subject: "Reset your password",
  //       html: `
  //         <p>You requested a password reset.</p>
  //         <p><a href="${resetURL}">Click here to reset your password</a></p>
  //       `,
  //     });
  //   },
  // },

  // emailVerification: {
  //   enabled: true,
  //   sendVerificationEmail: async ({ email, verificationURL }) => {
  //     await resend.emails.send({
  //       from: "Docusage <no-reply@yourdomain.com>",
  //       to: email,
  //       subject: "Verify your email",
  //       html: `
  //         <p>Welcome! Please verify your email:</p>
  //         <p><a href="${verificationURL}">Verify Email</a></p>
  //       `,
  //     });
  //   },
  // },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  plugins: [
    apiKey(),
    admin(),
    openAPI(),
    bearer(),
    multiSession(),
    nextCookies(),
  ],
});
