// components/TemplateLibrary.tsx
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type Template = {
  id: string;
  title: string;
  category: string;
  description: string;
};

const templates: Template[] = [
  {
    id: "1",
    title: "Job Application Form",
    category: "forms",
    description: "Collect candidate details and resumes easily.",
  },
  {
    id: "2",
    title: "Freelance Contract",
    category: "documents",
    description: "Standard agreement between client and freelancer.",
  },
  {
    id: "3",
    title: "Customer Feedback Survey",
    category: "forms",
    description: "Get insights from your users.",
  },
  {
    id: "4",
    title: "NDA Agreement",
    category: "legal",
    description: "Protect confidential information with ease.",
  },
  {
    id: "5",
    title: "Onboarding Checklist",
    category: "documents",
    description: "Streamline your employee onboarding process.",
  },
  {
    id: "6",
    title: "Bug Report Form",
    category: "forms",
    description:
      "Allow users to report bugs with screenshots and steps to reproduce.",
  },
];

const categories = ["all", "forms", "documents", "legal"];

export default function TemplateLibrary() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? templates
      : templates.filter((t) => t.category === activeTab);

  return (
    <section className="py-16 px-4 md:px-10 bg-background text-foreground">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Explore Our Templates
        </h2>
        <p className="text-muted-foreground mb-8">
          Choose from pre-designed forms and documents to jumpstart your
          workflow.
        </p>

        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="mb-10 justify-center flex-wrap">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="capitalize">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {filtered.map((template) => (
                <Card
                  key={template.id}
                  className="rounded-xl hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto">Use Template</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
