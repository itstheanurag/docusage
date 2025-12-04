import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import ThemeWrapper from "@/components/theme";

export const metadata: Metadata = {
  title: {
    default: "DocuSage - Professional Document Builder",
    template: "%s | DocuSage",
  },
  description:
    "Create stunning documents, invoices, and forms with ease using DocuSage. The all-in-one platform for professional document management.",
  keywords: [
    "document builder",
    "invoice generator",
    "form builder",
    "pdf generator",
    "docusage",
    "document management",
    "Code Share",
  ],
  authors: [{ name: "DocuSage Team" }],
  creator: "DocuSage",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL!,
    title: "DocuSage - Professional Document Builder",
    description:
      "Create stunning documents, invoices, and forms with ease using DocuSage.",
    siteName: "DocuSage",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DocuSage Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DocuSage - Professional Document Builder",
    description:
      "Create stunning documents, invoices, and forms with ease using DocuSage.",
    images: ["/og-image.png"],
    creator: "@docusage",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DocuSage",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Create stunning documents, invoices, and forms with ease using DocuSage.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="font-outfit">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
