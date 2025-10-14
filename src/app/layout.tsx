import type React from "react";
import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-provider";
import ThemeWrapper from "@/components/theme";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DocuSage - Professional Document Builder",
  description:
    "Create stunning documents with ease using our professional document builder",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="font-outfit">
        <ThemeWrapper>
          <AuthProvider>{children}</AuthProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
