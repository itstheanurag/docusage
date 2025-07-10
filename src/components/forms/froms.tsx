"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function NewFormPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/forms", {
      method: "POST",
      body: JSON.stringify({ name, type }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/forms/${data.id}/edit`);
    } else {
      alert("Failed to create form");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Create New Form</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Form Name</Label>
          <Input
            id="name"
            placeholder="e.g. Job Application"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="type">Form Type</Label>
          <Input
            id="type"
            placeholder="e.g. Survey, Feedback"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Form"}
        </Button>
      </form>
    </div>
  );
}
