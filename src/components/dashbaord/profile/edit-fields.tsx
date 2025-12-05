"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { User, Mail, Phone, MapPin } from "lucide-react";

const iconMap = {
  user: User,
  mail: Mail,
  phone: Phone,
  location: MapPin,
};

interface EditFieldProps {
  label: string;
  icon: "user" | "mail" | "phone" | "location";
  value: string;
  editingValue: string;
  isEditing: boolean;
  type?: string;
  onChange: (value: string) => void;
}

const EditField = ({
  label,
  icon,
  value,
  editingValue,
  isEditing,
  type = "text",
  onChange,
}: EditFieldProps) => {
  const IconComponent = iconMap[icon];

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {isEditing ? (
        <Input
          type={type}
          value={editingValue}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50">
          <IconComponent className="h-4 w-4 text-muted-foreground" />
          <span>{value || "—"}</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(EditField);
