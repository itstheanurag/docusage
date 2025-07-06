"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

    // Example: simulate successful registration
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" p-8 rounded-xl shadow-md w-full max-w-sm border">
        <h1 className="text-2xl font-semibold text-centermb-6">Register</h1>
        <form onSubmit={handleRegister} className="space-y-5">
          {error && <p className="text-sm text-center">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium "
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full py-2 rounded-md transition">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
