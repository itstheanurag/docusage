// app/auth/login/page.tsx
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getLoggedInUserFromHeader } from "@/lib/auth/jwt";
import LoginPage from "@/components/auth/Login";

export default async function LoginRoute() {
  const cookieHeader = (await headers()).get("cookie");
  const user = getLoggedInUserFromHeader(cookieHeader || undefined);

  if (user) {
    redirect("/dashboard");
  }

  return <LoginPage />;
}
