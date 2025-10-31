"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/better-auth/client";
import Link from "next/link";
import { BackgroundBeams } from "@/components/backgrounds/Beams";
import { BorderBeam } from "../backgrounds/border-beam";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const { error } = await authClient.forgetPassword({ email });

    setIsSending(false);

    if (!error) {
      toast.success("Password reset email sent! Check your inbox.");
    } else {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center  overflow-hidden sc">
      <BackgroundBeams />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border border-border shadow-md bg-background/80 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              Reset your password
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              We’ll send you an email with a reset link.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Button type="submit" className="w-full" disabled={isSending}>
                  {isSending ? "Sending..." : "Send reset link"}
                </Button>
              </motion.div>
            </form>
          </CardContent>

          <div className="text-center text-sm text-muted-foreground py-4">
            Remembered your password?{" "}
            <Link
              href="/auth/login"
              className="text-muted-foreground hover:text-foreground underline font-medium"
            >
              Sign in
            </Link>
          </div>
          <BorderBeam duration={8} size={100} />
        </Card>
      </motion.div>
    </div>
  );
}
