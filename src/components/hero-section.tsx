"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Zap, Users, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const BackgroundBeams = dynamic(
  () => import("@/components/backgrounds/Beams").then((mod) => mod.BackgroundBeams),
  { ssr: false }
);
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 bg-linear-to-br from-background via-background to-muted/20">
      {/* Wave Background */}
      <BackgroundBeams />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-24 h-24 bg-accent/5 rounded-full blur-xl"
        animate={{
          y: [0, 15, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/3 rounded-full blur-lg"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              className="inline-flex items-center rounded-full border border-border bg-card/50 backdrop-blur px-4 py-2 text-sm font-medium text-card-foreground shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Sparkles className="mr-2 h-4 w-4 text-accent" />
              </motion.div>
              New: AI-powered document templates
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Create Professional Documents in Minutes
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-10 text-lg text-muted-foreground sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            Transform your ideas into stunning documents with DocuSage&apos;s
            intuitive builder. From reports to presentations, create with
            confidence and style.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-medium group shadow-xl pulse-glow rounded-full"
                asChild
              >
                <a href="/register">
                  Start Building Free
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </a>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-medium bg-card/50 backdrop-blur shadow-lg rounded-full border-primary/20 hover:bg-primary/5"
                asChild
              >
                <a href="#preview">Watch Demo</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              {
                icon: FileText,
                label: "10K+",
                description: "Documents Created",
              },
              { icon: Users, label: "5K+", description: "Happy Users" },
              { icon: Zap, label: "99%", description: "Uptime" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center floating-animation"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.3 }}
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <stat.icon className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
