"use client";

import { FormRenderer } from "@/components/forms/form-render";
import { use } from "react";

export default function PublicFormPage({
  params,
}: {
  params: Promise<{ shareUrl: string }>;
}) {
  const resolvedParams = use(params);

  const mockFields = [
    {
      id: "1",
      type: "text",
      label: "What is your name?",
      required: true,
      placeholder: "Your full name",
    },
    {
      id: "2",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "you@example.com",
    },
    {
      id: "3",
      type: "radio",
      label: "How did you hear about us?",
      required: true,
      options: ["Social Media", "Friend", "Search Engine", "Other"],
    },
    {
      id: "4",
      type: "textarea",
      label: "Feedback",
      required: false,
      placeholder: "Tell us what you think...",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <FormRenderer
        title="Customer Feedback"
        description="Please let us know what you think about our service. We value your feedback!"
        fields={mockFields as any}
        onSubmit={(data) => {
          console.log(data);
          alert("Form submitted! Check console for data.");
        }}
      />
    </div>
  );
}
