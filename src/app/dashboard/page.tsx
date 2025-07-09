// app/dashboard/page.tsx
import { getServerUser, verifyJwt } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getServerUser()
  if (!user) redirect("/");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p className="text-muted-foreground">Email: {user.email}</p>
    </div>
  );
}
