"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/features/FormInputs";
import BackgroundPattern from "@/components/animations/backround";
import Animate from "@/components/animations/animate";
const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Login failed.");
      }

      // Optionally, you could extract user from res.json() if you need it
      // router.push("/dashboard");
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-24">
      <BackgroundPattern />
      <Animate className="p-4 rounded-xl shadow-md w-full max-w-sm border border-border bg-card">
        <h1 className="text-2xl font-semibold text-center mb-6 text-foreground">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && <p className="text-sm text-center text-red-500">{error}</p>}

          <FormInput
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <FormInput
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <p className="mt-4 text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </Animate>
    </div>
  );
};

export default LoginPage;
