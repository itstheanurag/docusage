"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function NewCodePage() {
  const router = useRouter();

  useEffect(() => {
    // Generate a random 6-character ID
    const id = Math.random().toString(36).substring(2, 8);
    router.replace(`/code/${id}`);
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}
