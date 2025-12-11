"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


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


function CTAButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24"
    >
      <Button
        size="lg"
        className="bg-foreground text-background hover:bg-foreground/90 h-12 px-8 text-base "
        asChild
      >

          <Link  href="/register" className="flex items-center">
          Start Building Free
          <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
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



export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 bg-background min-h-screen flex flex-col items-center">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <Badge />
        <Headline />
        <Subtitle />
        <CTAButtons />
      </div>
    </section>
  );
}
