"use client";

import React from "react";
import { useProfileStore } from "@/store/profileStore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const AvatarSection = () => {
  const { profile } = useProfileStore();
  const initials =
    profile.name
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "?";

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={profile.avatar ?? initials} />
        <AvatarFallback className="text-lg">{initials}</AvatarFallback>
      </Avatar>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{profile.name}</h3>
        <p className="text-sm text-muted-foreground">{profile.email}</p>
        <Badge variant="secondary">Premium Member</Badge>
      </div>
    </div>
  );
};

export default React.memo(AvatarSection);
