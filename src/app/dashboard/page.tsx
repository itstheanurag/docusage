import { getSession } from "@/lib/better-auth";
import Dashboard from "../../components/dashbaord/dashboard";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return <Dashboard session={session} />;
}
