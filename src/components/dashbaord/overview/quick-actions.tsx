"use client";

import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Receipt, FileText } from "lucide-react";

const QuickActions = memo(() => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Create new documents or manage existing ones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Button className="h-24 flex-col gap-3 w-full" variant="outline">
            <div className="p-2 bg-primary/10 rounded-full">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <span className="font-semibold">New Document</span>
          </Button>

          <Button className="h-24 flex-col gap-3 w-full" variant="outline">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
              <Receipt className="h-6 w-6 text-green-600" />
            </div>
            <span>Create Invoice</span>
          </Button>

          <Button className="h-24 flex-col gap-3 w-full" variant="outline">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-full">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <span>Browse Templates</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

QuickActions.displayName = "QuickActions";
export default QuickActions;
