import Features from "@/components/features/Features";
import TemplateLibrary from "@/components/features/Template";
import Home from "@/components/Home";
import HowItWorks from "@/components/HowItWorks";

export default async function HomePage() {
  return (
    <>
      <Home />
      <Features />
      <TemplateLibrary />
      <HowItWorks />
    </>
  );
}
