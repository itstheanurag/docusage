// app/auth/login/page.tsx
import { redirect } from "next/navigation";
import RegisterPage from "@/components/auth/Registration";
import { getServerUser } from "@/lib/auth/jwt";

export default async function LoginRoute() {
  const user = await getServerUser()
  if (user) {
    redirect("/dashboard");
  }

  return <RegisterPage />;
}
