"use client";

import { Button } from "@/components/ui/button";
import {
  Home,
  FileText,
  Receipt,
  Settings,
  LogOut,
  User,
  Key,
} from "lucide-react";
import { DashboarSectionType } from "@/types/dashboard";

interface SidebarProps {
  currentSection: DashboarSectionType;
  onSectionChange: (section: DashboarSectionType) => void;
  onLogout?: () => void;
}

export default function Sidebar({
  currentSection,
  onSectionChange,
  onLogout,
}: SidebarProps) {
  const sidebarItems = [
    {
      icon: Home,
      label: "Overview",
      section: "overview" as DashboarSectionType,
    },
    {
      icon: FileText,
      label: "Documents",
      section: "documents" as DashboarSectionType,
    },
    {
      icon: Receipt,
      label: "Invoices",
      section: "invoices" as DashboarSectionType,
    },
    { icon: User, label: "Profile", section: "profile" as DashboarSectionType },
    {
      icon: Settings,
      label: "Settings",
      section: "settings" as DashboarSectionType,
    },
    {
      icon: Key,
      label: "API Keys",
      section: "api-keys" as DashboarSectionType,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Logo / Header */}
      <div className="h-16 border-b flex items-center justify-between px-4">
        <h2 className="text-xl font-bold">DocuSage</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {sidebarItems.map((item) => (
          <Button
            key={item.section}
            variant={currentSection === item.section ? "default" : "ghost"}
            className="w-full justify-start h-10 px-3"
            onClick={() => onSectionChange(item.section)}
          >
            <item.icon className="mr-3 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>

      {/* Logout */}
      {onLogout && (
        <div className="px-4 py-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start h-10 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            onClick={onLogout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
