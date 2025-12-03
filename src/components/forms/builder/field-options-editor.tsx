import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { useFormBuilderStore } from "@/store/form-builder-store";

export default function FieldOptionsEditor() {
  const { fields, selectedFieldId, updateField } = useFormBuilderStore();
  const selectedField = fields.find((f) => f.id === selectedFieldId);

  if (
    !selectedField ||
    !["radio", "checkbox", "dropdown"].includes(selectedField.type)
  )
    return null;

  return (
    <div className="space-y-2">
      <Label>Options</Label>

      {selectedField.options?.map((opt: string, i: number) => (
        <div key={i} className="flex gap-2">
          <Input
            value={opt}
            onChange={(e) => {
              const newOptions = [...(selectedField.options || [])];
              newOptions[i] = e.target.value;
              updateField(selectedField.id, { options: newOptions });
            }}
          />
          <Button
            variant="ghost"
            onClick={() => {
              const newOptions = selectedField.options?.filter(
                (_: string, idx: number) => idx !== i,
              );
              updateField(selectedField.id, { options: newOptions });
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          const newOptions = [
            ...(selectedField.options || []),
            `Option ${(selectedField.options?.length || 0) + 1}`,
          ];
          updateField(selectedField.id, { options: newOptions });
        }}
      >
        Add Option
      </Button>
    </div>
  );
}
