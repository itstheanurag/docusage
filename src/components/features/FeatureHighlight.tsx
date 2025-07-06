"use client";
import AnimateOnce from "@/components/animations/animate-once";
import {
  FileText,
  Send,
  BarChart,
  Receipt,
  BellRing,
  Clock,
  Users,
  LayoutDashboard,
} from "lucide-react";

const features = [
  {
    title: "Form Builder",
    description: "Create dynamic and reusable forms with a simple interface.",
    icon: FileText,
  },
  {
    title: "Bulk Sharing",
    description:
      "Send forms or documents to multiple users with a single click.",
    icon: Send,
  },
  {
    title: "Analytics & Tracking",
    description:
      "View submission metrics, open rates, and detailed form insights.",
    icon: BarChart,
  },
  {
    title: "Professional Invoices",
    description: "Generate branded invoices and download or share them easily.",
    icon: Receipt,
  },
  {
    title: "Smart Reminders",
    description:
      "Send automated reminders to recipients who haven't responded yet.",
    icon: BellRing,
  },
  {
    title: "Deadline Management",
    description:
      "Set due dates for forms and invoices with automated follow-ups.",
    icon: Clock,
  },
  {
    title: "User Management",
    description:
      "Easily manage contacts, teams, and recipients from one place.",
    icon: Users,
  },
  {
    title: "Central Dashboard",
    description:
      "Monitor activity, view statuses, and manage everything from one place.",
    icon: LayoutDashboard,
  },
];

export default function FeatureHighlights() {
  return (
    <section className="py-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Built to Simplify Your Workflow
        </h2>
        <p className="text-muted-foreground text-lg mb-12">
          Everything you need to create, share, and track forms & invoices
          effortlessly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <AnimateOnce
              key={idx}
              delay={idx * 0.1}
              className="tracking-tight p-6 rounded-xl border bg-card text-left shadow-sm hover:cursor-pointer hover:shadow-md hover:scale-101 transition duration-150 ease-in-out"
            >
              <feature.icon className="h-6 w-6 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </AnimateOnce>
          ))}
        </div>
      </div>
    </section>
  );
}
