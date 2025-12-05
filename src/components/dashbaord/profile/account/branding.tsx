"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";

interface BrandingCardProps {
  profile: any;
  editedProfile: any;
  setEditedProfile: (value: any) => void;
  isEditing: boolean;
}

const BrandingCard = ({
  profile,
  editedProfile,
  setEditedProfile,
  isEditing,
}: BrandingCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Branding</CardTitle>
        <CardDescription>
          Set your default logo for forms and invoices
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="logoUrl">Default Logo URL</Label>

          {isEditing ? (
            <Input
              id="logoUrl"
              placeholder="https://example.com/logo.png"
              value={editedProfile.logoUrl}
              onChange={(e) =>
                setEditedProfile({ ...editedProfile, logoUrl: e.target.value })
              }
            />
          ) : (
            <div className="flex items-center space-x-3 p-2 border rounded-md bg-muted/50">
              {profile.logoUrl ? (
                <Image
                  src={profile.logoUrl}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              ) : (
                <span className="text-sm text-muted-foreground">
                  No logo set
                </span>
              )}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            This logo will be automatically applied to new forms and invoices.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(BrandingCard);
