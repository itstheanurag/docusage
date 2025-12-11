import { Button } from "@/components/ui/button";
import { FIELD_TYPES } from "@/lib/data/form";
import { useFormBuilderStore } from "@/store/form-builder-store";

export default function FieldPalette() {
  const { addField } = useFormBuilderStore();

  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <h2 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">
          Add Fields
        </h2>

        <div className="grid grid-cols-2 gap-2">
          {FIELD_TYPES.map((item) => (
            <Button
              key={item.type}
              variant="outline"
              className="flex flex-col items-center justify-center h-20 gap-2 hover:border-primary hover:text-primary transition-colors"
              onClick={() => addField(item.type)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
