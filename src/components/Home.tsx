"use client";
import AnimateOnce from "@/components/animations/animate-once";
import { Button } from "@/components/ui/button";
import BackgroundPattern from "./animations/backround";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-24">
      {/* Dotted Background */}
      <BackgroundPattern />
      {/* Content */}
      <div className="text-center max-w-2xl space-y-6">
        <AnimateOnce className="text-4xl md:text-5xl font-bold tracking-tight">
          Simplify Forms, Documents & Invoices
        </AnimateOnce>

        <AnimateOnce
          delay={0.1}
          className="text-lg md:text-xl text-muted-foreground"
        >
          Docusage helps you create, share, and track smart forms and
          professional invoices — all in one place.
        </AnimateOnce>

        <AnimateOnce delay={0.2} className="flex justify-center gap-4">
          <Link href="/auth/login" className="hover:cursor-pointer">
            <Button>Get Started</Button>
          </Link>

          <Button
            variant="outline"
            className="bg-white dark:bg-neutral-900 hover:cursor-pointer"
          >
            Learn More
          </Button>
        </AnimateOnce>
      </div>
    </main>
  );
}
