"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any; // you can type this better later
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        {children}
        <Footer />
      </ThemeProvider>
    </SessionProvider>
  );
}
