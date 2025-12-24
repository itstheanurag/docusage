import { DashboarSectionType } from "@/types/dashboard";
import {
  Home,
  FileText,
  Receipt,
  Code2,
  FormInput,
  User,
  Key,
  PenTool,
  LayoutTemplate,
} from "lucide-react";

export const sidebarItems = [
  {
    icon: Home,
    label: "Overview",
    section: "overview" as DashboarSectionType,
    href: "/dashboard",
  },
  {
    icon: FileText,
    label: "Documents",
    section: "documents" as DashboarSectionType,
    href: "/dashboard/documents",
  },
  {
    icon: Receipt,
    label: "Invoices",
    section: "invoices" as DashboarSectionType,
    href: "/dashboard/invoices",
  },

  {
    icon: Code2,
    label: "Snippets",
    section: "codes" as DashboarSectionType,
    href: "/dashboard/codes",
  },
  {
    icon: FormInput,
    label: "Forms",
    section: "forms" as DashboarSectionType,
    href: "/dashboard/forms",
  },
  {
    icon: User,
    label: "Profile",
    section: "profile" as DashboarSectionType,
    href: "/dashboard/profile",
  },
  // {
  //   icon: Key,
  //   label: "API Keys",
  //   section: "api-keys" as DashboarSectionType,
  //   href: "/dashboard/api-keys",
  // },
  {
    icon: PenTool,
    label: "Whiteboard",
    section: "whiteboard" as DashboarSectionType,
    href: "/dashboard/whiteboard",
  },
];
