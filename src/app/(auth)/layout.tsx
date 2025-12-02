import { AuthNavbar } from "@/components/navbars/auth-navbar";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <AuthNavbar />
      {children}
    </div>
  );
}
