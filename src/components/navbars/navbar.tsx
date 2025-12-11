"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";

function LogoBlock() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center"
    >
      <Link href="/" className="flex items-center space-x-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary pulse-glow">
          <FileText className="size-5 text-primary-foreground" />
        </span>
        <span className="text-xl font-bold tracking-tight text-foreground">
          Docusage
        </span>
      </Link>
    </motion.div>
  );
}

function DesktopNavigation() {
  const links = ["Products", "Features", "Pricing"];

  return (
    <div className="hidden md:flex flex-1 justify-center">
      <nav className="flex items-center space-x-8">
        {links.map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            whileHover={{ y: -2 }}
          >
            {item}
          </motion.a>
        ))}
      </nav>
    </div>
  );
}


function DesktopActions() {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />
      <Link href="/register">
        <Button
          size="sm"
          className="bg-foreground text-background hover:bg-foreground/90 font-medium px-6"
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
}

function MobileMenuButton({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  return (
    <div className="md:hidden flex items-center space-x-2">
      <ModeToggle />
      <Button variant="ghost" size="sm" onClick={toggle}>
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  );
}

function MobileNavigation({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  const links = ["Products", "Features", "Pricing"];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden border-t border-border/40 py-4"
    >
      <nav className="flex flex-col space-y-4">
        {links.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            onClick={close}
          >
            {item}
          </a>
        ))}

        <div className="flex flex-col space-y-2 pt-4 border-t border-border/40">
          <Link href="/register">
            <Button className="w-full bg-foreground text-background hover:bg-foreground/90" size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </motion.div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-l border-r">
        <div className="flex h-16 items-center justify-between">
          <LogoBlock />
          <DesktopNavigation />
          <DesktopActions />
          <MobileMenuButton isOpen={isOpen} toggle={toggleMenu} />
        </div>

        <MobileNavigation isOpen={isOpen} close={closeMenu} />
      </div>
    </motion.nav>
  );
}
