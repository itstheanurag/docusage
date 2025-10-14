"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Menu,
  Home,
  FileText,
  Receipt,
  Settings,
  LogOut,
  User,
  Bell,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ModeToggle } from "@/components/mode-toggle";
import { DashboardOverview } from "@/components/dashbaord/dashboard-overview";
import { DocumentsManager } from "@/components/dashbaord/documents-manager";
import { InvoicesManager } from "@/components/dashbaord/invoices-manager";
import { ProfileManager } from "@/components/dashbaord/profile-manager";
import { SettingsManager } from "@/components/dashbaord/settings-manager";
import { DashboarSectionType } from "@/types/dashboard";
import { useAuthStore } from "@/stores/authStore";

export default function DashboardPage() {
  const [currentSection, setCurrentSection] =
    useState<DashboarSectionType>("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

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
  ];

  const handleSectionChange = (section: DashboarSectionType) => {
    setCurrentSection(section);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (currentSection) {
      case "overview":
        return <DashboardOverview />;
      case "documents":
        return <DocumentsManager />;
      case "invoices":
        return <InvoicesManager />;
      case "profile":
        return <ProfileManager />;
      case "settings":
        return <SettingsManager />;
      default:
        return <DashboardOverview />;
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="h-16 border-b">
        <h2 className="text-xl font-bold p-4">DocuSage</h2>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {sidebarItems.map((item, index) => (
          <motion.div
            key={item.section}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant={currentSection === item.section ? "default" : "ghost"}
              className="w-full justify-start h-10 px-3"
              onClick={() => handleSectionChange(item.section)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          </motion.div>
        ))}
      </nav>

      <div className="px-4 py-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start h-10 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b bg-background px-6 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-4"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center gap-x-3">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <ModeToggle />
            </div>
          </div>
        </header>

        <main className="p-6">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
