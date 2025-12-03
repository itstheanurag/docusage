"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Receipt,
  TrendingUp,
  Users,
  Plus,
  Eye,
  Download,
  Edit,
} from "lucide-react";

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Documents",
      value: "24",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Invoices Created",
      value: "18",
      change: "+8%",
      icon: Receipt,
      color: "text-green-600",
    },
    {
      title: "Revenue Generated",
      value: "$12,450",
      change: "+23%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Active Clients",
      value: "32",
      change: "+5%",
      icon: Users,
      color: "text-orange-600",
    },
  ];

  const recentDocuments = [
    {
      id: 1,
      name: "Project Proposal - ABC Corp",
      type: "Proposal",
      status: "Draft",
      lastModified: "2 hours ago",
    },
    {
      id: 2,
      name: "Invoice #INV-2024-001",
      type: "Invoice",
      status: "Sent",
      lastModified: "1 day ago",
    },
    {
      id: 3,
      name: "Contract Agreement - XYZ Ltd",
      type: "Contract",
      status: "Completed",
      lastModified: "3 days ago",
    },
    {
      id: 4,
      name: "Marketing Report Q1",
      type: "Report",
      status: "Review",
      lastModified: "1 week ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Welcome back! Here&apos;s what&apos;s happening with your documents.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 gap-2 flex-wrap">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold truncate">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from
                  last month
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Create new documents or manage existing ones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Button className="h-20 flex-col gap-2 w-full">
                <Plus className="h-5 w-5" />
                New Document
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 w-full">
                <Receipt className="h-5 w-5" />
                Create Invoice
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 w-full">
                <FileText className="h-5 w-5" />
                Browse Templates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Documents */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Your latest document activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-2"
                >
                  <div className="flex items-start sm:items-center gap-4 flex-1 flex-wrap min-w-0">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{doc.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {doc.type} • {doc.lastModified}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mt-2 sm:mt-0">
                    <Badge
                      variant={
                        doc.status === "Completed"
                          ? "default"
                          : doc.status === "Sent"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {doc.status}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
