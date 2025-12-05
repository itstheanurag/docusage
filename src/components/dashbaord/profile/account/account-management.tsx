"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Key, Download } from "lucide-react";
import React from "react";

const AccountManagementCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Management</CardTitle>
        <CardDescription>Manage your account and data</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export Data
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Key className="h-4 w-4" /> Change Password
          </Button>

          <Button variant="destructive" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" /> Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(AccountManagementCard);
