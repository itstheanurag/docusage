"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/features/FormInputs";
import BackgroundPattern from "@/components/animations/backround";
import Animate from "@/components/animations/animate";
import { toast } from "sonner";
const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all required fields")
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 👈 ensures cookies are sent and received
        body: JSON.stringify({ email, password }),
      });


      if (!res.ok) {
        const { error } = await res.json();
        toast.error(error.error)
        return
      }
      toast.success("Login Successful");
      router.refresh();
      setTimeout(() => router.push("/dashboard"), 100);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
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
