import { PreviewSection } from "@/components/preview-section";
import { CallToActionSection } from "@/components/call-to-action-section";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";

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
