"use client";

import { useInvoiceStore } from "@/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BuilderPanel } from "@/components/builders/shared/builder-panel";
import { User } from "lucide-react";

const SendToDetails = () => {
  const invoice = useInvoiceStore();

  return (
    <BuilderPanel title="Bill To" icon={User}>
      <div className="space-y-4">
        {/* Logo URL */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">
            Logo URL
          </label>
          <Input
            value={invoice.toLogo || ""}
            onChange={(e) => invoice.updateField("toLogo", e.target.value)}
            placeholder="https://example.com/client-logo.png"
            className="bg-background/50"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">
            Name
          </label>
          <Input
            value={invoice.toName}
            onChange={(e) => invoice.updateField("toName", e.target.value)}
            placeholder="Client name"
            className="bg-background/50"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">
            Email
          </label>
          <Input
            type="email"
            value={invoice.toEmail}
            onChange={(e) => invoice.updateField("toEmail", e.target.value)}
            placeholder="client@email.com"
            className="bg-background/50"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">
            Address
          </label>
          <Textarea
            rows={3}
            value={invoice.toAddress}
            onChange={(e) => invoice.updateField("toAddress", e.target.value)}
            placeholder="Client address"
            className="bg-background/50"
          />
        </div>
      </div>
    </BuilderPanel>
  );
};

export default SendToDetails;

