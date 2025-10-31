"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Session } from "@/lib/better-auth";

export default function UserAvatar({
  session,
  logout,
}: {
  session?: Session;
  logout?: () => void;
}) {
  if (!session) return <></>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-10 w-10 cursor-pointer bg-background text-foreground ">
          <AvatarImage src={session.user?.image || "/placeholder.svg"} />
          <AvatarFallback>
            {session.user?.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="p-4">
          <p className="font-medium">{session.user?.name}</p>
          <p className="text-sm text-muted-foreground">{session.user?.email}</p>
        </div>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
