import Navbar from "@/components/navbars/navbar";
import {
  Hero,
  FeatureGrid,
  DetailedFeatures,
  LivePlayground,
  NewFooter,
} from "@/components/home/new";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      {/* Hero Section */}
      <Hero />
      {/* Feature Grid */}
      <FeatureGrid />
      {/* Detailed Features */}
      <DetailedFeatures />
      {/* Live Playground */}
      <LivePlayground />
      {/* Footer */}
      <NewFooter />
    </main>
  );
}
