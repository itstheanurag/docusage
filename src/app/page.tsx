import Container from "@/components/container";
import HeroSection from "@/components/home/hero-section";
import Navbar from "@/components/navbars/navbar";
import Pricing from "@/components/home/pricing";
import Testimonials from "@/components/home/testimonials";
import dynamic from "next/dynamic";
import ProductShowcase from "@/components/home/product-showcase";
import { BuilderType } from "@/types";

const PreviewSection = dynamic(() => import("@/components/home/preview-section"));
const CallToActionSection = dynamic(
  () => import("@/components/home/call-to-action-section"),
);
const Features = dynamic(() => import("@/components/home/features/features-section"));
const Footer = dynamic(() => import("@/components/footer"));

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section - Full Bleed */}
      <HeroSection />

      {/* Features - Contained with Alt Background */}
      <Container className="py-24 bg-muted/30">
        <Features />
      </Container>

      {/* Product Showcase - Contained */}
      <Container className="py-24">
        <ProductShowcase />
      </Container>

      {/* Preview - Contained with Alt Background */}
      <Container className="py-24 bg-muted/30">
        <PreviewSection />
      </Container>

      {/* Testimonials - Contained */}
      <Container className="py-24">
        <Testimonials />
      </Container>

      {/* Pricing - Contained with Alt Background */}
      <Container className="py-24 bg-muted/30">
        <Pricing />
      </Container>

      {/* Call to Action - Full Bleed */}
      <CallToActionSection />
      
      <Footer />
    </main>
  );
}
