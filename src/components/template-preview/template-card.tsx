"use client";

import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";
import { Template } from "./template-grid";

export default function TemplateCard({ template }: { template: Template }) {
  const Icon = template.icon;

  return (
    <div className="h-full border bg-card transition-all duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 bg-linear-to-br ${template.color}`}>
            <Icon className="h-6 w-6 text-foreground" />
          </div>

          <Badge variant="outline" className="text-xs px-2 py-1">
            {template.category}
          </Badge>
        </div>

        {/* Text */}
        <h3 className="font-semibold mb-2 hover:text-primary">
          {template.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {template.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center justify-center gap-1">
            <Star className="size-4 fill-accent text-foreground" />
            <span>{template.rating}</span>
          </div>

          <div className="flex items-center justify-center gap-1">
            <Clock className="size-4 text-foreground" />
            <span>{template.uses}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
