import { FIELD_TYPES } from "@/data/form";
import { useFormBuilderStore } from "@/store/form-builder-store";
import { cn } from "@/lib/utils";

export default function FieldPalette() {
  const { addField } = useFormBuilderStore();

  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <h2 className="font-semibold mb-3 text-xs text-muted-foreground uppercase tracking-wider">
          Add Fields
        </h2>

        <div className="grid grid-cols-2 gap-2">
          {FIELD_TYPES.map((item) => (
            <button
              key={item.type}
              className={cn(
                // Base styling
                "flex flex-col items-center justify-center h-20 gap-2 rounded-xl",
                // Glassmorphism effect
                "bg-card/40 backdrop-blur-sm",
                "border border-border/30",
                // Text styling
                "text-muted-foreground",
                // Transitions
                "transition-all duration-200",
                // Hover state - vibrant glow
                "hover:bg-card/70 hover:border-primary/40",
                "hover:text-primary hover:shadow-lg hover:shadow-primary/10",
                "hover:scale-[1.02]",
                // Active state
                "active:scale-[0.98]"
              )}
              onClick={() => addField(item.type)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

