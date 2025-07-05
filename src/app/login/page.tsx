"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const handleLogin = async () => {
    await signIn("github", {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold">Login to Docusage</h1>
        <Button type="button" onClick={handleLogin}>
          Sign in with GitHub
        </Button>
      </div>
    </main>
  );
}
