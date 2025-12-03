import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarItems } from "@/lib/data/dashboard-sidebar";
import { useDashboardStore } from "@/store/dashboardStore";
import { signOut } from "@/lib/better-auth/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const {
    currentSection,
    setCurrentSection,
    isCollapsed: storeIsCollapsed,
    toggleCollapse,
    setIsMobileMenuOpen,
  } = useDashboardStore();

  const isCollapsed = mobile ? false : storeIsCollapsed;
  const router = useRouter();

  const handleLogout = async () => {
    const data = await signOut();

    if (!data.error) {
      toast.success("Logged out successfully");
      router.push("/");
    } else toast.error(data.error.message);
  };

  const handleSectionChange = (section: any) => {
    setCurrentSection(section);
    setIsMobileMenuOpen(false);
  };

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
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="hidden lg:flex"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
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
            onClick={() => handleSectionChange(item.section)}
          >
            <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
            {!isCollapsed && item.label}
          </Button>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start h-10 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950",
            isCollapsed && "justify-center px-2"
          )}
          onClick={handleLogout}
        >
          <LogOut className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
}
