"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/better-auth/client";

export function SignUpForm() {
  const handleSocialLogin = async (provider: "github" | "google") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
      });
    } catch (error: any) {
      toast.error(error?.message || "Failed to authenticate");
    }
  };

  return (
    <div className="min-h-fit flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">
              Start Creating Docs
            </CardTitle>
            <CardDescription>
              Use Google Or Github to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-4 mt-4">
                <Button
                  variant="outline"
                  className="w-full bg-[#171515] text-white hover:bg-[#0f0f0f]"
                  onClick={() => handleSocialLogin("github")}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>

                <Separator className="opacity-50" />

                <Button
                  variant="outline"
                  className="w-full bg-[#ffffff] text-black border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
                  onClick={() => handleSocialLogin("google")}
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                  >
                    <title>Google</title>
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.62-4.88 1.62-3.86 0-6.99-3.14-6.99-7s3.13-7 6.99-7c2.2 0 3.68.86 4.54 1.69l2.5-2.5C18.5.48 15.82 0 12.48 0 5.88 0 0 5.88 0 12s5.88 12 12.48 12c6.92 0 11.7-4.78 11.7-12.2 0-.76-.06-1.52-.18-2.28H12.48z" />
                  </svg>
                  Google
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
