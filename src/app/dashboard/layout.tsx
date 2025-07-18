import { getServerUser } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";
import DashboardLayout from "./DasbhoardLayout";

export default async function Layout() {
  const user = await getServerUser();
  // console.log("SERVER USER FOUDN IN DashboardLayout", user)
  if (user) {
   return <DashboardLayout />;
  }

  return redirect('/')
}
