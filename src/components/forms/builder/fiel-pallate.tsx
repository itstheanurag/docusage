import { Button } from "@/components/ui/button";
import { FIELD_TYPES } from "@/lib/data/form";
import { FieldType } from "@/types/form";

export default function FieldPalette({ addField }: { addField: any }) {
  return (
    <div className="w-64 border-r bg-background p-4 flex flex-col gap-4 overflow-y-auto">
      <div>
        <h2 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">
          Add Fields
        </h2>

        <div className="grid grid-cols-2 gap-2">
          {FIELD_TYPES.map(
            (item: { type: FieldType; icon: any; label: string }) => (
              <Button
                key={item.type}
                variant="outline"
                className="flex flex-col items-center justify-center h-20 gap-2"
                onClick={() => addField(item.type)}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
