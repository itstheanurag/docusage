"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, FilePlus, DollarSign, Share2 } from "lucide-react";
import { AuthModal } from "../(auth)/auth-modal";
import { useEffect, useState } from "react";

function Badge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-8"
    >
      <div className="inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider backdrop-blur-sm">
        <span className="mr-2 h-2 w-2 rounded-full bg-green-700 animate-pulse" />
        v2.0 NOW AVAILABLE
      </div>
    </motion.div>
  );
}

function Headline() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mb-8 text-center max-w-4xl"
    >
      <span className="block text-5xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl leading-[1.1]">
        Construct with
      </span>
      <span className="block text-5xl font-bold tracking-tight text-muted-foreground sm:text-7xl lg:text-8xl leading-[1.1]">
        Intelligence.
      </span>
    </motion.h1>
  );
}

function Subtitle() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mb-10 text-lg font-bold text-muted-foreground sm:text-xl max-w-2xl text-center leading-tighter font-light"
    >
      The unified workspace for generating, editing, and managing
      professional documents. Powered by next-gen AI.
    </motion.p>
  );
}

function CTAButtons({ onOpenAuth }: { onOpenAuth: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
    >
      <Button
        size="lg"
        onClick={onOpenAuth}
        className="bg-foreground text-background hover:bg-foreground/90 h-12 px-8 text-base "
      >
        Start Building Free
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="h-12 px-8 text-base bg-background hover:bg-muted/50 border-border/50"
        asChild
      >
        <a href="#documentation">View Documentation</a>
      </Button>
    </motion.div>
  );
}

const ROTATING_FEATURES = [
  {
    title: "Build Forms in One Step",
    description: "Create single or multi-step forms with validations and logic.",
    icon: FilePlus,
  },
  {
    title: "Reusable Document Templates",
    description: "Generate contracts, letters, and templated documents instantly.",
    icon: FileText,
  },
  {
    title: "Smart Invoicing",
    description: "Create invoices, compute totals, and export professionally.",
    icon: DollarSign,
  },
  {
    title: "Share & Collaborate",
    description: "Share links, embed forms, or collaborate in real time.",
    icon: Share2,
  },
];

function RotatingHeroCard() {
  const [index, setIndex] = useState(0);

  // Rotate every 3 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_FEATURES.length);
    }, 3000);

    return () => clearInterval(id);
  }, []);

  const feature = ROTATING_FEATURES[index];
  const Icon = feature.icon;

  return (
    <div className="mt-10 w-full flex justify-center">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.5 }}
        className="w-full sm:w-[420px] md:w-[460px] p-6 rounded-xl border border-border/40 bg-card/80 backdrop-blur-md shadow-lg"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-muted flex items-center justify-center">
            <Icon className="h-6 w-6 text-foreground" />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-1">
              {feature.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-snug">
              {feature.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* --- Hero Section --- */
export default function HeroSection() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-32 bg-background min-h-screen flex flex-col items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          <Badge />
          <Headline />
          <Subtitle />
          <CTAButtons onOpenAuth={() => setIsAuthOpen(true)} />
          <AnimatePresence mode="wait">
            <RotatingHeroCard />  
          </AnimatePresence>
        </div>
      </section>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
