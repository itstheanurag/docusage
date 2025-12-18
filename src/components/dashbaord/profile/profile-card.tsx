"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AvatarSection from "./account/avatar";
import EditField from "./edit-fields";
import React from "react";
import { useProfileStore } from "@/store/profileStore";

const ProfileCard = () => {
  const { profile, editedProfile, isEditing, updateEditedProfile } = useProfileStore();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your personal details and contact information
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Avatar + Name */}
        <AvatarSection />

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EditField
            label="Full Name"
            icon="user"
            value={profile.name}
            editingValue={editedProfile.name}
            isEditing={isEditing}
            onChange={(v) => updateEditedProfile({ name: v })}
          />

          <EditField
            label="Email Address"
            icon="mail"
            value={profile.email}
            editingValue={editedProfile.email}
            isEditing={isEditing}
            type="email"
            onChange={(v) => updateEditedProfile({ email: v })}
          />

          <EditField
            label="Phone Number"
            icon="phone"
            value={profile.phone}
            editingValue={editedProfile.phone}
            isEditing={isEditing}
            onChange={(v) => updateEditedProfile({ phone: v })}
          />

          <EditField
            label="Location"
            icon="location"
            value={profile.location}
            editingValue={editedProfile.location}
            isEditing={isEditing}
            onChange={(v) => updateEditedProfile({ location: v })}
          />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          {isEditing ? (
            <Textarea
              id="bio"
              rows={3}
              value={editedProfile.bio}
              onChange={(e) => updateEditedProfile({ bio: e.target.value })}
            />
          ) : (
            <div className="p-3 border rounded-md bg-muted/50">
              <p className="text-sm">{profile.bio || "No bio added."}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(ProfileCard);
