"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Session } from "@/lib/better-auth";
import { signOut } from "@/lib/better-auth/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UserAvatar({ session }: { session?: Session }) {
  const router = useRouter();

  const handleLogout = async () => {
    const data = await signOut();

    if (!data.error) {
      toast.success("Logged out successfully");
      router.push("/");
    } else toast.error(data.error.message);
  };

  if (!session) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-10 w-10 cursor-pointer bg-background text-foreground ">
          <AvatarImage src={session.user?.image ?? undefined} />
          <AvatarFallback>
            {session.user?.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="p-4">
          <p className="font-medium">{session.user?.name}</p>
          <p className="text-sm text-muted-foreground">{session.user?.email}</p>
        </div>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
