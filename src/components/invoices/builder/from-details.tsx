"use client";

import { useInvoiceStore } from "@/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BuilderPanel } from "@/components/builders/shared/builder-panel";
import { Building } from "lucide-react";

const FromDetails = () => {
  const invoice = useInvoiceStore();

  return (
    <BuilderPanel title="From" icon={Building}>
      <div className="space-y-4">
        {/* Logo URL */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">
            Logo URL
          </label>
          <Input
            value={invoice.fromLogo || ""}
            onChange={(e) => invoice.updateField("fromLogo", e.target.value)}
            placeholder="https://example.com/logo.png"
            className="bg-background/50"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">
            Name
          </label>
          <Input
            value={invoice.fromName}
            onChange={(e) => invoice.updateField("fromName", e.target.value)}
            placeholder="Your name or company"
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
            value={invoice.fromEmail}
            onChange={(e) => invoice.updateField("fromEmail", e.target.value)}
            placeholder="your@email.com"
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
            value={invoice.fromAddress}
            onChange={(e) => invoice.updateField("fromAddress", e.target.value)}
            placeholder="Your address"
            className="bg-background/50"
          />
        </div>
      </div>
    </BuilderPanel>
  );
};

export default FromDetails;

