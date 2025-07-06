"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // ✅ FIXED
import ThemeToggleButton from "./theme/button";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-3 flex items-center justify-between backdrop-blur-md border font-sans shadow-md rounded-none">
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight cursor-pointer dark:hover:bg-neutral-900 px-3 py-1 rounded"
        >
          Docusage!
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <ThemeToggleButton />
          <Link href="/auth/login" passHref>
            <Button variant="default">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
