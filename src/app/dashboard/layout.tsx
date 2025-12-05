import { getSession } from "@/lib/better-auth";
import DashboardLayout from "@/components/dashbaord/dashboard-layout";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <DashboardLayout session={session}>{children}</DashboardLayout>;
}
