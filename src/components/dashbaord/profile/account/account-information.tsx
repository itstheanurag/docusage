"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface AccountInfoCardProps {
  joinDate: string;
}

const AccountInfoCard = ({ joinDate }: AccountInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Info</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Joined {joinDate}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="outline">Premium Plan</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(AccountInfoCard);
