import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormBuilderStore } from "@/store/form-builder-store";

export default function FieldValidation() {
  const { fields, selectedFieldId, updateField } = useFormBuilderStore();
  const selectedField = fields.find((f) => f.id === selectedFieldId);

  if (!selectedField) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="required-switch">Required Field</Label>
        <Switch
          id="required-switch"
          checked={selectedField.required}
          onCheckedChange={(checked) =>
            updateField(selectedField.id, { required: checked })
          }
        />
      </div>

      <Separator />

      {(selectedField.type === "text" || selectedField.type === "textarea") && (
        <div className="space-y-3">
          <Label className="text-xs uppercase text-muted-foreground">
            Text Validation
          </Label>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="allow-alphabets"
              checked={selectedField.validation?.allowAlphabets !== false}
              onCheckedChange={(checked) =>
                updateField(selectedField.id, {
                  validation: {
                    ...selectedField.validation,
                    allowAlphabets: checked as boolean,
                  },
                })
              }
            />
            <Label htmlFor="allow-alphabets">Allow Alphabets</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="allow-numbers"
              checked={selectedField.validation?.allowNumbers !== false}
              onCheckedChange={(checked) =>
                updateField(selectedField.id, {
                  validation: {
                    ...selectedField.validation,
                    allowNumbers: checked as boolean,
                  },
                })
              }
            />
            <Label htmlFor="allow-numbers">Allow Numbers</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="allow-special"
              checked={selectedField.validation?.allowSpecialChars === true}
              onCheckedChange={(checked) =>
                updateField(selectedField.id, {
                  validation: {
                    ...selectedField.validation,
                    allowSpecialChars: checked as boolean,
                  },
                })
              }
            />
            <Label htmlFor="allow-special">Allow Special Characters</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="allow-spaces"
              checked={selectedField.validation?.allowSpaces !== false}
              onCheckedChange={(checked) =>
                updateField(selectedField.id, {
                  validation: {
                    ...selectedField.validation,
                    allowSpaces: checked as boolean,
                  },
                })
              }
            />
            <Label htmlFor="allow-spaces">Allow Spaces</Label>
          </div>
        </div>
      )}

      {selectedField.type === "number" && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label>Min Value</Label>
            <Input
              type="number"
              value={selectedField.validation?.min || ""}
              onChange={(e) =>
                updateField(selectedField.id, {
                  validation: {
                    ...selectedField.validation,
                    min: e.target.value ? Number(e.target.value) : undefined,
                  },
                })
              }
            />
          </div>
          <div>
            <Label>Max Value</Label>
            <Input
              type="number"
              value={selectedField.validation?.max || ""}
              onChange={(e) =>
                updateField(selectedField.id, {
                  validation: {
                    ...selectedField.validation,
                    max: e.target.value ? Number(e.target.value) : undefined,
                  },
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
