// app/dashboard/page.tsx
import FormBuilder from "@/components/forms/fromBuilder";
import { getServerUser } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getServerUser()
  if (!user) redirect("/");

  return (

    <FormBuilder />
  );
}
