"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import React from "react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav
      className={`sticky top-0 z-50 w-full px-6 py-3 flex items-center justify-between backdrop-blur-md border font-sans shadow-md = rounded-none`}
    >
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold tracking-tight">
          Docusage!
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
          <Button className="font-medium">Get Started</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
