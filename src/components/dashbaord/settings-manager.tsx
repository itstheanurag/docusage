"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
  Key,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";

export function SettingsManager() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      marketing: false,
      updates: true,
    },
    privacy: {
      profileVisible: true,
      activityTracking: false,
      dataCollection: true,
    },
    preferences: {
      language: "en",
      timezone: "UTC-5",
      dateFormat: "MM/DD/YYYY",
      autoSave: true,
    },
  });

  const handleSettingChange = (
    category: string,
    setting: string,
    value: boolean | string,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }));
    toast.success("Setting updated");
  };

  const settingSections = [
    {
      title: "Notifications",
      description: "Manage how you receive notifications",
      icon: Bell,
      items: [
        {
          key: "email",
          label: "Email Notifications",
          description: "Receive notifications via email",
        },
        {
          key: "push",
          label: "Push Notifications",
          description: "Receive push notifications in browser",
        },
        {
          key: "marketing",
          label: "Marketing Emails",
          description: "Receive promotional content",
        },
        {
          key: "updates",
          label: "Product Updates",
          description: "Get notified about new features",
        },
      ],
    },
    {
      title: "Privacy & Security",
      description: "Control your privacy and security settings",
      icon: Shield,
      items: [
        {
          key: "profileVisible",
          label: "Public Profile",
          description: "Make your profile visible to others",
        },
        {
          key: "activityTracking",
          label: "Activity Tracking",
          description: "Allow tracking for analytics",
        },
        {
          key: "dataCollection",
          label: "Data Collection",
          description: "Help improve our services",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application preferences and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>
              Customize how DocuSage looks and feels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="flex items-center gap-2"
                >
                  <Sun className="h-4 w-4" />
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="flex items-center gap-2"
                >
                  <Moon className="h-4 w-4" />
                  Dark
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("system")}
                  className="flex items-center gap-2"
                >
                  <Monitor className="h-4 w-4" />
                  System
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <CardTitle>Language & Region</CardTitle>
            </div>
            <CardDescription>
              Set your language and regional preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={settings.preferences.language}
                onValueChange={(value) =>
                  handleSettingChange("preferences", "language", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={settings.preferences.timezone}
                onValueChange={(value) =>
                  handleSettingChange("preferences", "timezone", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                  <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                  <SelectItem value="UTC+1">
                    Central European Time (UTC+1)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select
                value={settings.preferences.dateFormat}
                onValueChange={(value) =>
                  handleSettingChange("preferences", "dateFormat", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification & Privacy Settings */}
        {settingSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <section.icon className="h-5 w-5" />
                  <CardTitle>{section.title}</CardTitle>
                </div>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between space-x-2"
                  >
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">
                        {item.label}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      checked={
                        settings[
                          section.title.toLowerCase().includes("notification")
                            ? "notifications"
                            : "privacy"
                        ][item.key as keyof typeof settings.notifications]
                      }
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          section.title.toLowerCase().includes("notification")
                            ? "notifications"
                            : "privacy",
                          item.key,
                          checked,
                        )
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Account Management */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5" />
              <CardTitle>Account Management</CardTitle>
            </div>
            <CardDescription>Manage your account and data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
              >
                <Download className="h-4 w-4" />
                Export Data
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
              >
                <Key className="h-4 w-4" />
                Change Password
              </Button>
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
