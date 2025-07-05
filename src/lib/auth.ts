// src/lib/auth.ts
import { getServerSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  pages: {
    signIn: "login",
  },
};
export function auth() {
  return getServerSession(authOptions);
}
