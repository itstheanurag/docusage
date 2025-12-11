"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { FileText } from "lucide-react";

export function AuthNavbar() {
  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary pulse-glow">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="text-xl font-serif font-bold text-foreground">
            DocuSage
          </span>
        </Link>

        {/* Theme Toggle */}
        <ModeToggle />
      </div>
    </motion.nav>
  );
}
