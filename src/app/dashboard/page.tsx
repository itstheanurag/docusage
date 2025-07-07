// app/dashboard/page.tsx
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth/jwt";

export default async function Dashboard() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return <div className="text-red-500">Not logged in</div>;
  }

  const payload = verifyJwt(token);

  if (!payload) {
    return <div className="text-red-500">Invalid token</div>;
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    return <div className="text-red-500">User not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p className="text-muted-foreground">Email: {user.email}</p>
    </div>
  );
}
