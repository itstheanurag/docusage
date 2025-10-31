import { createAuthClient } from "better-auth/react";
import {
  adminClient,
  multiSessionClient,
  lastLoginMethodClient,
  apiKeyClient,
} from "better-auth/client/plugins";
import { toast } from "sonner";

export const client = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_URL!,
  plugins: [
    adminClient(),
    multiSessionClient(),
    lastLoginMethodClient(),
    apiKeyClient(),
  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    },
  },
});

export const { signUp, signIn, signOut, useSession } = client;
