import { getServerSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      httpOptions: {
        timeout: 40000,
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  pages: {
    signIn: "/login",
  },
};

export function auth() {
  return getServerSession(authOptions);
}
