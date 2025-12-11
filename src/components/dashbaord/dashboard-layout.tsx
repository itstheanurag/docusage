"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { DialogTitle } from "@/components/ui/dialog";
import { Menu, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme/mode-toggle";
import UserAvatar from "../user";
import Sidebar from "./sidebar";
import { useDashboardStore } from "@/store/dashboardStore";
import { Session } from "@/lib/better-auth/auth-types";

export default function DashboardLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const { isMobileMenuOpen, setIsMobileMenuOpen, isCollapsed } =
    useDashboardStore();

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
          <Sidebar />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <div className="sr-only">
            <DialogTitle>Mobile Navigation Menu</DialogTitle>
          </div>
          <Sidebar mobile={true} />
        </SheetContent>
      </Sheet>
      {/* Main Content */}
      <div
        className={cn(
          "lg:pl-72 transition-all duration-300",
          isCollapsed ? "lg:pl-20" : "lg:pl-72"
        )}
      >
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b bg-background px-6">
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
              <UserAvatar session={session} />
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
