import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FieldOptionsEditor from "./field-options-editor";
import FieldValidation from "./field-validation";
import { useFormBuilderStore } from "@/store/form-builder-store";

export default function PropertiesPanel() {
  const { fields, selectedFieldId, updateField } = useFormBuilderStore();
  const selectedField = fields.find((f) => f.id === selectedFieldId);

  if (!selectedField) {
    return (
      <div className="w-80 border-l bg-background p-4 text-center text-muted-foreground">
        Select a field to edit properties
      </div>
    );
  }

  return (
    <div className="w-80 border-l bg-background p-4 overflow-y-auto space-y-6">
      <div className="space-y-2">
        <Label>Label</Label>
        <Input
          value={selectedField.label}
          onChange={(e) =>
            updateField(selectedField.id, { label: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Placeholder</Label>
        <Input
          value={selectedField.placeholder || ""}
          onChange={(e) =>
            updateField(selectedField.id, { placeholder: e.target.value })
          }
        />
      </div>

      <Separator />

      <FieldValidation />

      <FieldOptionsEditor />
    </div>
  );
}
