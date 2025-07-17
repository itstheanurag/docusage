"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ThemeToggleButton from "./theme/button";
import Link from "next/link";
import LogoutButton from "./auth/LogoutButton";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 👈 IMPORTANT!
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          console.log("USER DATA", data);
          setUser(data.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, [pathname]);

  console.log("USER FROM THE CLIENT ", user);

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-3 flex items-center justify-between backdrop-blur-md border font-sans shadow-md rounded-none">
      <div className="w-full flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight cursor-pointer dark:hover:bg-neutral-900 px-3 py-1 rounded"
        >
          Docusage!
        </Link>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <ThemeToggleButton />
          {user ? (
            <LogoutButton />
          ) : (
            <Link href="/auth/login">
              <Button variant="default">Get Started</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
