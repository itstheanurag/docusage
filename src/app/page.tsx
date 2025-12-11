import Container from "@/components/container";
import HeroSection from "@/components/home/hero-section";
import Navbar from "@/components/navbars/navbar";
import Pricing from "@/components/home/pricing";
import Testimonials from "@/components/home/testimonials";
import { documentFeatures } from "@/lib/data/feature";
import dynamic from "next/dynamic";

const PreviewSection = dynamic(() => import("@/components/home/preview-section"));
const CallToActionSection = dynamic(
  () => import("@/components/home/call-to-action-section"),
);
const Features = dynamic(() => import("@/components/home/features/features-section"));
const Footer = dynamic(() => import("@/components/footer"));

export default function HomePage() {  
  return (
    <main className="min-h-screen">
      <Navbar />
      <Container>
        <HeroSection />
      </Container>

      <Container>
        <Features />
      </Container>

      <Container>
        <PreviewSection />
      </Container>

      <Container>
        <Testimonials />
      </Container>

       <Container>
        <Pricing />
      </Container>


<Container >


      <CallToActionSection />
</Container>
      <Footer />
    </main>
  );
}
