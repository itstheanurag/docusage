import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useFormBuilderStore } from "@/store/form-builder-store";
import { Textarea } from "@/components/ui/textarea";

export default function FormHeader() {
  const {
    steps,
    currentStep,
    setSteps,
    setCurrentStep,
    formTitle,
    setFormTitle,
    formDescription,
    setFormDescription,
    logoUrl,
  } = useFormBuilderStore();

  return (
    <Card className="p-8 border-t-4 border-t-primary mb-6 shadow-sm">
      {logoUrl && (
        <div className="mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} className="h-16 object-contain" alt="Form Logo" />
        </div>
      )}

      <div className="space-y-2">
        <Input
          className="text-4xl font-bold border-none px-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/50 bg-transparent"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Untitled Form"
        />

        <Textarea
          className="text-lg text-muted-foreground border-none px-0 min-h-auto resize-none focus-visible:ring-0 placeholder:text-muted-foreground/50 bg-transparent"
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          placeholder="Form description"
          rows={1}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
        />
      </div>

      <div className="flex items-center gap-2 mt-8 border-t pt-4">
        <span className="text-sm font-medium text-muted-foreground mr-2">
          Steps:
        </span>
        <div className="flex gap-2 flex-wrap">
          {steps.map((s) => (
            <div key={s} className="relative group">
              <Button
                variant={currentStep === s ? "default" : "outline"}
                onClick={() => setCurrentStep(s)}
                className={`w-10 h-10 rounded-full ${
                  currentStep === s ? "ring-2 ring-offset-2 ring-primary" : ""
                }`}
              >
                {s}
              </Button>
              {steps.length > 1 && (
                <button
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newSteps = steps.filter((step) => step !== s);
                    setSteps(newSteps);
                    if (currentStep === s) {
                      setCurrentStep(newSteps[0] || 1);
                    }
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-dashed border-muted-foreground/50 hover:border-primary hover:text-primary"
            onClick={() => {
              const newStep = (steps[steps.length - 1] || 0) + 1;
              setSteps([...steps, newStep]);
              setCurrentStep(newStep);
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
