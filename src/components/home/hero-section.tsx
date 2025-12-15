"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FileText, Receipt, ClipboardList } from "lucide-react";
import { AuthModal } from "../(auth)/auth-modal";
import { MouseEvent, useState } from "react";
import InteractiveWireframe from "./interactive-wireframe";
import { cn } from "@/lib/utils";

// Floating icon component for visual interest
function FloatingIcon({ 
  icon: Icon, 
  delay, 
  className 
}: { 
  icon: React.ElementType; 
  delay: number; 
  className: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: [0.4, 0.7, 0.4], 
        y: [0, -15, 0],
      }}
      transition={{ 
        duration: 4, 
        delay, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className={className}
    >
      <div className="p-3 bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl shadow-lg">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
    </motion.div>
  );
}

function Badge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
        <Sparkles className="h-3.5 w-3.5" />
        <span>v2.0 — AI-Powered Document Generation</span>
      </div>
    </motion.div>
  );
}

function Headline() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="mb-8 text-center max-w-5xl mx-auto"
    >
      <span className="block text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl leading-[1.1]">
        <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
          Construct with
        </span>
      </span>
      <span className="block text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl leading-[1.1] mt-2">
        <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent p-2">
          Intelligence
        </span>
      </span>
    </motion.h1>
  );
}

function Subtitle() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="mb-12 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto text-center leading-relaxed"
    >
      The unified workspace for generating, editing, and managing
      professional documents. Powered by next-generation AI.
    </motion.p>
  );
}

function CTAButtons({ onOpenAuth }: { onOpenAuth: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.45 }}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24"
    >
      <Button
        size="lg"
        onClick={onOpenAuth}
        className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
      >
        Start Building Free
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="h-12 px-8 text-base border-border/50 hover:bg-muted/50 transition-all hover:-translate-y-0.5"
        asChild
      >
        <a href="#documentation">View Documentation</a>
      </Button>
    </motion.div>
  );
}

export default function HeroSection() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  // Mouse position for spotlight effect
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <>
      <section 
        className="relative overflow-hidden pt-32 pb-40 min-h-screen flex flex-col items-center group"
        onMouseMove={handleMouseMove}
      >
        {/* Spotlight Effect Background */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(var(--primary-rgb), 0.1),
                transparent 80%
              )
            `,
          }}
        />
        
        {/* Static Background Gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center max-w-7xl">
          <Badge />
          <Headline />
          <Subtitle />
          <CTAButtons onOpenAuth={() => setIsAuthOpen(true)} />
        </div>

        {/* 3D Tilted Wireframe Container */}
        <motion.div
          initial={{ opacity: 0, rotateX: 20, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, rotateX: 15, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.2 }}
          style={{ perspective: "1200px" }}
          className="w-full max-w-6xl mx-auto px-4 perspective-1000"
        >
          <div className="relative transform-preserve-3d transition-transform duration-700 hover:rotate-x-0">
             {/* Glow behind the board */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-purple-500/30 blur-2xl opacity-30 rounded-[3rem] -z-10" />
            
            <InteractiveWireframe />
            
             {/* Reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-2xl" />
          </div>
        </motion.div>
      </section>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
