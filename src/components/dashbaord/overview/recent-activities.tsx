"use client";

import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Edit, Download } from "lucide-react";
import { useManagementStore } from "@/store/managementStore";
import { useEffect } from "react";


const RecentActivity = memo(() => {
  const { recentActivities, fetchData } = useManagementStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Documents</CardTitle>
        <CardDescription>Your latest document activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-all gap-2"
            >
              <div className="flex items-start sm:items-center gap-4 flex-1 flex-wrap min-w-0">
                <div className={`p-3 rounded-xl shrink-0 ${doc.bgColor}`}>
                  <FileText className={`h-5 w-5 ${doc.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate">{doc.name}</p>
                  <p className="text-sm text-muted-foreground truncate flex items-center gap-2">
                    <span>{doc.type}</span>
                    <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                    <span>{doc.lastModified}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap mt-2 sm:mt-0">
                <Badge
                  variant={
                    doc.status === "Completed"
                      ? "default"
                      : doc.status === "Sent"
                      ? "secondary"
                      : "outline"
                  }
                  className="capitalize"
                >
                  {doc.status}
                </Badge>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/5">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/5">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/5">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

RecentActivity.displayName = "RecentActivity";
export default RecentActivity;
