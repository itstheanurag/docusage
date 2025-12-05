import { ProfileManager } from "@/components/dashbaord/profile-manager";
import { getSession } from "@/lib/better-auth";
import { redirect } from "next/navigation";

export default async function ProfileDashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <ProfileManager session={session} />;
}
