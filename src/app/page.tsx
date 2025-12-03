import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbars/navbar";
import dynamic from "next/dynamic";

const PreviewSection = dynamic(() => import("@/components/preview-section"));
const CallToActionSection = dynamic(
  () => import("@/components/call-to-action-section"),
);
const FeaturesSection = dynamic(() => import("@/components/features-section"));
const Footer = dynamic(() => import("@/components/footer"));

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PreviewSection />
      <CallToActionSection />
      <Footer />
    </main>
  );
}
