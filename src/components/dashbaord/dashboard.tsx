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
import { cn } from "@/lib/utils";

import { ModeToggle } from "@/components/mode-toggle";
import { DashboarSectionType } from "@/types/dashboard";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const LoadingState = () => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
  </div>
);

const DashboardOverview = dynamic(
  () =>
    import("@/components/dashbaord/dashboard-overview").then(
      (mod) => mod.DashboardOverview
    ),
  { loading: LoadingState }
);
const DocumentsManager = dynamic(
  () =>
    import("@/components/dashbaord/documents-manager").then(
      (mod) => mod.DocumentsManager
    ),
  { loading: LoadingState }
);
const InvoicesManager = dynamic(
  () =>
    import("@/components/dashbaord/invoices-manager").then(
      (mod) => mod.InvoicesManager
    ),
  { loading: LoadingState }
);
const CodesManager = dynamic(
  () =>
    import("@/components/dashbaord/codes-manager").then(
      (mod) => mod.CodesManager
    ),
  { loading: LoadingState }
);
const FormsManager = dynamic(
  () =>
    import("@/components/dashbaord/forms-manager").then(
      (mod) => mod.FormsManager
    ),
  { loading: LoadingState }
);
const ProfileManager = dynamic(
  () =>
    import("@/components/dashbaord/profile-manager").then(
      (mod) => mod.ProfileManager
    ),
  { loading: LoadingState }
);
const SettingsManager = dynamic(
  () =>
    import("@/components/dashbaord/settings-manager").then(
      (mod) => mod.SettingsManager
    ),
  { loading: LoadingState }
);
const ApiKeyManager = dynamic(
  () =>
    import("@/components/dashbaord/api-key-manager").then(
      (mod) => mod.ApiKeyManager
    ),
  { loading: LoadingState }
);

import { signOut } from "@/lib/better-auth/client";
import { Session } from "@/lib/better-auth/auth-types";

import UserAvatar from "../user";
import Sidebar from "./sidebar";

export default function Dashboard({ session }: { session: Session }) {
  const [currentSection, setCurrentSection] =
    useState<DashboarSectionType>("overview");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      case "codes":
        return <CodesManager />;
      case "forms":
        return <FormsManager />;
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
      <div
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300",
          isCollapsed ? "lg:w-20" : "lg:w-72"
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background">
          <Sidebar
            currentSection={currentSection}
            onSectionChange={handleSectionChange}
            onLogout={handleLogout}
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
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
      <div
        className={cn(
          "lg:pl-72 transition-all duration-300",
          isCollapsed ? "lg:pl-20" : "lg:pl-72"
        )}
      >
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
