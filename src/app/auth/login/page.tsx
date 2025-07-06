"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

    // Example login logic (replace with your real auth logic or NextAuth)
    if (email === "admin@example.com" && password === "password") {
      // Simulate success redirect
      router.push("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="p-8 rounded-xl shadow-md w-full max-w-sm border">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          {error && <p className="text-sm text-center">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium ">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full py-2 rounded-md transition">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
