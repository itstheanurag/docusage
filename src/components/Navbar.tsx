"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ FIXED
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const session = useSession();
  console.log("DATA ", session);
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-3 flex items-center justify-between backdrop-blur-md border font-sans shadow-md rounded-none">
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold tracking-tight">Docusage!</div>

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

          {session?.user ? (
            <Image
              src={session.user?.image ?? "/default-avatar.png"}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <Button
              type="button"
              className="font-medium"
              onClick={() => router.push("/login")}
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
