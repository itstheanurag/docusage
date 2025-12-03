"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";
import { Template } from "./template-grid";

export default function TemplateCard({ template }: { template: Template }) {
  const Icon = template.icon;

  return (
    <Card className="h-full border-border/50 bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg bg-linear-to-br ${template.color}`}>
            <Icon className="h-6 w-6 text-foreground" />
          </div>

          <Badge variant="secondary" className="text-xs">
            {template.category}
          </Badge>
        </div>

        {/* Text */}
        <h3 className="font-semibold mb-2 group-hover:text-primary">
          {template.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {template.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span>{template.rating}</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{template.uses} uses</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
