import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { auth } from "@/lib/auth"; // <-- new
import ClientLayout from "@/client/layout";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Docusage",
  description: "GitHub Auth with NextAuth.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth(); // <-- server-side session fetch

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientLayout session={session}>{children}</ClientLayout>
      </body>
    </html>
  );
}
