import Features from "@/components/features/Features";
import TemplateLibrary from "@/components/features/Template";
import Home from "@/components/Home";
import HowItWorks from "@/components/HowItWorks";
import { getServerUser } from "@/lib/auth/jwt";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await getServerUser()
  console.log("SERVER USER FOUDN IN HOMEPAGE", user)
  if(user) redirect("/dashboard");
  return (
    <>
      <Home />
      <Features />
      <TemplateLibrary />
      <HowItWorks />
    </>
  );
}
