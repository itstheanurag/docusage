import { FieldType } from "@/types/form";
import {
  Type,
  Hash,
  Mail,
  AlignLeft,
  CheckSquare,
  CircleDot,
  ChevronDown,
  Calendar,
  Clock,
  Upload,
  Star,
  PenTool,
  LucideIcon,
} from "lucide-react";

export const FIELD_TYPES: {
  type: FieldType;
  icon: LucideIcon;
  label: string;
}[] = [
  { type: "text", icon: Type, label: "Short Text" },
  { type: "textarea", icon: AlignLeft, label: "Long Text" },
  { type: "email", icon: Mail, label: "Email" },
  { type: "number", icon: Hash, label: "Number" },
  { type: "checkbox", icon: CheckSquare, label: "Checkbox" },
  { type: "radio", icon: CircleDot, label: "Radio" },
  { type: "dropdown", icon: ChevronDown, label: "Dropdown" },
  { type: "date", icon: Calendar, label: "Date" },
  { type: "time", icon: Clock, label: "Time" },
  { type: "file", icon: Upload, label: "File Upload" },
  { type: "rating", icon: Star, label: "Rating" },
  { type: "signature", icon: PenTool, label: "Signature" },
];
