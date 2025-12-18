"use client";

import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";
import { Session } from "@/lib/better-auth/auth-types";
import ProfileCard from "./profile/profile-card";
import BrandingCard from "./profile/account/branding";
import AccountManagementCard from "./profile/account/account-management";
import StatsCard from "./profile/stats-card";
import AccountInfoCard from "./profile/account/account-information";
import AppearanceSettingsCard from "./profile/appearance-settings";
import SaveCancelBar from "./profile/save-cancel-bar";
import { useProfileStore } from "@/store/profileStore";
import { useEffect } from "react";

export function ProfileManager({ session }: { session: Session }) {
  const user = session.user;
  const {
    profile,
    editedProfile,
    isEditing,
    setProfile,
    setIsEditing,
    saveProfile,
    cancelEdit,
  } = useProfileStore();

  useEffect(() => {
    if (!profile.email) {
      setProfile({
        name: user.name ?? "",
        email: user.email,
        phone: (user as any).phone ?? "",
        location: (user as any).location ?? "",
        bio: (user as any).bio ?? "",
        avatar: user.image ?? null,
        joinDate: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : "N/A",
        logoUrl: "",
      });
    }
  }, [user, profile.email, setProfile]);

  const handleSave = () => {
    saveProfile();
  };

  const handleCancel = () => {
    cancelEdit();
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile & Settings</h1>
          <p className="text-muted-foreground">
            Manage your personal information, branding, and preferences
          </p>
        </div>
        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="flex items-center gap-2"
        >
          {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <ProfileCard />
          <BrandingCard />
          <AccountManagementCard />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <StatsCard />
          <AccountInfoCard />
          <AppearanceSettingsCard />
        </div>
      </div>

      {isEditing && (
        <SaveCancelBar onCancel={handleCancel} onSave={handleSave} />
      )}
    </div>
  );
}
