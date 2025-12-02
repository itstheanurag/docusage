"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, FileText, Users, BarChart } from "lucide-react";
import Link from "next/link";

export function FormsManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forms</h1>
          <p className="text-muted-foreground mt-2">
            Create forms and collect responses.
          </p>
        </div>
        <Link href="/forms/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Form
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards */}
        {[1, 2].map((i) => (
          <Card
            key={i}
            className="hover:border-primary/50 transition-colors cursor-pointer group"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  Customer Feedback {i}
                </CardTitle>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>Active • 24 Responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-muted-foreground mt-4 pt-4 border-t">
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>128 Views</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BarChart className="h-4 w-4" />
                  <span>18% Conv.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
