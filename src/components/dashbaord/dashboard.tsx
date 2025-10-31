"use client";
import { useState } from "react";

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
  Key,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ModeToggle } from "@/components/mode-toggle";
import { DashboardOverview } from "@/components/dashbaord/dashboard-overview";
import { DocumentsManager } from "@/components/dashbaord/documents-manager";
import { InvoicesManager } from "@/components/dashbaord/invoices-manager";
import { ProfileManager } from "@/components/dashbaord/profile-manager";
import { SettingsManager } from "@/components/dashbaord/settings-manager";
import { ApiKeyManager } from "@/components/dashbaord/api-key-manager";
import { DashboarSectionType } from "@/types/dashboard";
import { signOut } from "@/lib/better-auth/client";
import { Session } from "@/lib/better-auth/auth-types";

import UserAvatar from "../user";
import Sidebar from "./sidebar";

export default function Dashboard({ session }: { session: Session }) {
  const [currentSection, setCurrentSection] =
    useState<DashboarSectionType>("overview");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    const data = await signOut();

    if (!data.error) {
      toast.success("Logged out successfully");
      router.push("/");
    } else toast.error(data.error.message);
  };

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
        return <ProfileManager session={session} />;
      case "settings":
        return <SettingsManager />;
      case "api-keys":
        return <ApiKeyManager />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background">
          <Sidebar
            currentSection={currentSection}
            onSectionChange={handleSectionChange}
            onLogout={handleLogout}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <Sidebar
            currentSection={currentSection}
            onSectionChange={handleSectionChange}
            onLogout={handleLogout}
          />
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
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <ModeToggle />

              <UserAvatar session={session} logout={handleLogout} />

              {/* <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage
                      src={session.user?.image || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {session.user?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-4 border-b">
                    <p className="font-medium">{session.user?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>
          </div>
        </header>

        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
