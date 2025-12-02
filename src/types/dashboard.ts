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
  | "api-keys";
