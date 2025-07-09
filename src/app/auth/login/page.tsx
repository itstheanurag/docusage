// app/auth/login/page.tsx
import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth/jwt";
import LoginPage from "@/components/auth/Login";

export default async function LoginRoute() {
  const user = await getServerUser()

  if (user) {
    redirect("/dashboard");
  }

  return <LoginPage />;
}
