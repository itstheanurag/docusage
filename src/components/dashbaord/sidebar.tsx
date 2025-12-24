"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/store/dashboardStore";
import { signOut } from "@/lib/better-auth/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/data";

export default function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const {
    isCollapsed: storeIsCollapsed,
    toggleCollapse,
    setIsMobileMenuOpen,
  } = useDashboardStore();

  const isCollapsed = mobile ? false : storeIsCollapsed;
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const data = await signOut();

    if (!data.error) {
      toast.success("Logged out successfully");
      router.push("/");
    } else toast.error(data.error.message);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo / Header */}
      <div
        className={cn(
          "h-16 flex items-center border-b border-border/50 gap-2",
          isCollapsed ? "justify-center" : "justify-between"
        )}
      >
        {!isCollapsed && (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent px-4"
          >
            DocuSage
          </motion.h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="hidden lg:flex rounded-full"
        >
          {isCollapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 space-y-2">
        {sidebarItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link href={item.href} key={item.section} className="block w-full">
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-11 rounded-xl transition-all duration-200 group relative overflow-hidden",
                  isCollapsed && "justify-center",
                  isActive && "bg-white dark:bg-zinc-800 shadow-sm"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white dark:bg-zinc-800 border border-border/50 rounded-xl z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center w-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon
                      className={cn(
                        "size-4 transition-colors",
                        !isCollapsed && "mr-2",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                  </motion.div>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "font-medium",
                         isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </div>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-2 py-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start h-11 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl",
            isCollapsed && "justify-center"
          )}
          onClick={handleLogout}
        >
          <motion.div whileHover={{ scale: 1.1, rotate: -5 }}>
            <LogOut className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
          </motion.div>
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
}
