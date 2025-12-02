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
  ChevronLeft,
  ChevronRight,
  Code2,
  FormInput,
} from "lucide-react";
import { DashboarSectionType } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentSection: DashboarSectionType;
  onSectionChange: (section: DashboarSectionType) => void;
  onLogout?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  currentSection,
  onSectionChange,
  onLogout,
  isCollapsed = false,
  onToggleCollapse,
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
    {
      icon: Code2,
      label: "Code Snippets",
      section: "codes" as DashboarSectionType,
    },
    {
      icon: FormInput,
      label: "Forms",
      section: "forms" as DashboarSectionType,
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
      <div
        className={cn(
          "h-16 border-b flex items-center px-4",
          isCollapsed ? "justify-center" : "justify-between"
        )}
      >
        {!isCollapsed && <h2 className="text-xl font-bold">DocuSage</h2>}
        {onToggleCollapse && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="hidden lg:flex"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {sidebarItems.map((item) => (
          <Button
            key={item.section}
            variant={currentSection === item.section ? "default" : "ghost"}
            className={cn(
              "w-full justify-start h-10 px-3",
              isCollapsed && "justify-center px-2"
            )}
            onClick={() => onSectionChange(item.section)}
          >
            <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
            {!isCollapsed && item.label}
          </Button>
        ))}
      </nav>

      {/* Logout */}
      {onLogout && (
        <div className="px-4 py-4 border-t">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-10 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950",
              isCollapsed && "justify-center px-2"
            )}
            onClick={onLogout}
          >
            <LogOut className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      )}
    </div>
  );
}
