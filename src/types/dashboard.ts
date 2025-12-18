export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export type DashboarSectionType =
  | "overview"
  | "documents"
  | "invoices"
  | "codes"
  | "forms"
  | "profile"
  | "settings"
  | "api-keys"
  | "whiteboard";

export interface DashboardState {
  isMobileMenuOpen: boolean;
  isCollapsed: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setIsCollapsed: (isCollapsed: boolean) => void;
  toggleMobileMenu: () => void;
  toggleCollapse: () => void;
}
