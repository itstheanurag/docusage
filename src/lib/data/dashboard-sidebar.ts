import { DashboarSectionType } from "@/types/dashboard";
import {
  Home,
  FileText,
  Receipt,
  Code2,
  FormInput,
  User,
  Settings,
  Key,
} from "lucide-react";

export const sidebarItems = [
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
    label: "Snippets",
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
