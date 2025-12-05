"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const InvoiceStatCard = ({ stat, count }: { stat: any; count: number }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
        <DollarSign className={`h-4 w-4 ${stat.iconColor}`} />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">
          ${stat.amount.toLocaleString()}
        </div>

        <p className="text-xs text-muted-foreground">
          {stat.subtext || `From ${count} invoices`}
        </p>
      </CardContent>
    </Card>
  );
};

export default InvoiceStatCard;
