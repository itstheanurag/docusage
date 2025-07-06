"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/features/FormInputs";
import BackgroundPattern from "@/components/animations/backround";
import Animate from "@/components/animations/animate";

const RegisterPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-24">
      <BackgroundPattern />
      <Animate className="p-4 rounded-xl shadow-md w-full max-w-sm border border-border bg-card">
        <h1 className="text-2xl font-semibold text-center mb-6 text-foreground">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-5">
          {error && <p className="text-sm text-center text-red-500">{error}</p>}

          <FormInput
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />

          <FormInput
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />

          <FormInput
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        <p className="mt-4 text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </Animate>
    </div>
  );
};

export default RegisterPage;
