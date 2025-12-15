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
    <div className="h-screen w-full overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/50">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300",
          isCollapsed ? "lg:w-20" : "lg:w-72",
          "m-3 h-[calc(100vh-1.5rem)] rounded-2xl overflow-hidden shadow-sm"
        )}
      >
        <div className="flex grow flex-col gap-y-2 overflow-y-auto bg-background/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-border/50 rounded-2xl">
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
          "transition-all duration-300",
          isCollapsed
            ? "lg:pl-[calc(5rem+1.5rem)]"
            : "lg:pl-[calc(18rem+1.5rem)]"
        )}
      >
        <div className="flex flex-col min-h-screen lg:min-h-[calc(100vh-1.5rem)] lg:h-[calc(100vh-1.5rem)] lg:my-3 lg:mr-3 lg:rounded-2xl lg:border lg:border-border/50 lg:bg-background/60 lg:backdrop-blur-xl lg:shadow-sm lg:overflow-hidden">
          <header className="sticky top-0 lg:static z-40 flex h-16 shrink-0 items-center border-b border-border/50 bg-background/50 backdrop-blur-xl px-6">
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

          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
