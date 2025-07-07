// components/HowItWorks.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PencilRuler, CheckCircle, Send } from "lucide-react";

const steps = [
  {
    title: "Start with a Template or Blank",
    description:
      "Choose from a variety of professionally designed templates or begin with a clean slate.",
    icon: PencilRuler,
  },
  {
    title: "Customize Your Form or Document",
    description:
      "Drag and drop fields, add conditional logic, and personalize the design to match your brand.",
    icon: CheckCircle,
  },
  {
    title: "Share, Export, or Collect Responses",
    description:
      "Distribute via link, export as PDF or Word, or gather submissions directly.",
    icon: Send,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-4 md:px-10 bg-background text-foreground">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
        <p className="text-muted-foreground mb-10">
          From start to finish, building documents has never been easier.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="rounded-2xl border border-border hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-col items-center text-center gap-2">
                <step.icon className="w-10 h-10 text-primary" />
                <CardTitle className="text-lg">{step.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {step.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
