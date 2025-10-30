import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import ThemeWrapper from "@/components/theme";

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
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
