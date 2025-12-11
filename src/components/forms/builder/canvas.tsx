import { Card } from "@/components/ui/card";
import FormHeader from "./form-header";
import FieldCard from "./field-card";
import { useFormBuilderStore } from "@/store/form-builder-store";

export default function BuilderCanvas() {
  const { fields, currentStep } = useFormBuilderStore();

  return (
    <div className="w-full max-w-3xl flex flex-col gap-6">
      <FormHeader />

      {/* Fields */}
      <div className="max-w-3xl mx-auto space-y-6 w-full">
        {fields.filter((f) => f.step === currentStep).length === 0 ? (
          <Card className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground bg-background/50">
            Add a field to Step {currentStep}
          </Card>
        ) : (
          fields
            .filter((f) => f.step === currentStep)
            .map((field) => <FieldCard key={field.id} field={field} />)
        )}
      </div>
    </div>
  );
}
