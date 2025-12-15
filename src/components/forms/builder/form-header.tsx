import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useFormBuilderStore } from "@/store/form-builder-store";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        // Base panel styling
        "relative rounded-xl overflow-hidden mb-4",
        // Glassmorphism effect
        "bg-card/60 backdrop-blur-md",
        "border border-border/40",
        // Top accent border
        "border-t-4 border-t-primary",
        // Subtle shadow for depth
        "shadow-lg shadow-black/5"
      )}
    >
      <div className="p-5">
        {logoUrl && (
          <div className="mb-4">
            <img
              src={logoUrl}
              className="h-12 object-contain"
              alt="Form Logo"
            />
          </div>
        )}

        <div className="space-y-1">
          <Input
            className="text-2xl font-semibold border-none px-0 h-auto focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground/60"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Untitled Form"
          />

          <Textarea
            className="text-sm text-muted-foreground border-none px-0 min-h-auto resize-none focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground/50"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Add a short description..."
            rows={1}
            onInput={(e) => {
              const t = e.target as HTMLTextAreaElement;
              t.style.height = "auto";
              t.style.height = `${t.scrollHeight}px`;
            }}
          />
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mt-4 border-t border-border/30 pt-3">
          <span className="text-xs font-medium text-muted-foreground">Steps:</span>

          <div className="flex gap-2 flex-wrap">
            {steps.map((s) => (
              <div
                key={s}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all duration-200",
                  currentStep === s
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted/70"
                )}
              >
                <button onClick={() => setCurrentStep(s)}>
                  Step {s}
                </button>

                {steps.length > 1 && (
                  <Trash2
                    className="h-3 w-3 cursor-pointer opacity-60 hover:opacity-100 hover:text-destructive transition-colors"
                    onClick={() => {
                      const newSteps = steps.filter((x) => x !== s);
                      setSteps(newSteps);
                      if (currentStep === s) setCurrentStep(newSteps[0] || 1);
                    }}
                  />
                )}
              </div>
            ))}

            {/* Add Step */}
            <button
              className="h-6 w-6 flex items-center justify-center rounded-full border border-dashed border-border/60 text-muted-foreground hover:text-primary hover:border-primary/60 transition-all duration-200"
              onClick={() => {
                const newStep = (steps[steps.length - 1] || 0) + 1;
                setSteps([...steps, newStep]);
                setCurrentStep(newStep);
              }}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

