import { useInvoiceStore } from "@/store/invoiceStore";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Palette } from "lucide-react";
import { DockIconButton } from "@/components/builders/shared/dock-icon-button";

interface ThemeSelectorProps {
  mouseX?: any;
  magnification?: number;
  distance?: number;
}

export const ThemeSelector = ({ mouseX, magnification, distance }: ThemeSelectorProps) => {
  const { theme, accentColor, updateField } = useInvoiceStore();

  const themes = [
    { 
      id: "clean", 
      name: "Clean", 
      description: "Simple & professional"
    },
    { 
      id: "modern", 
      name: "Modern", 
      description: "Bold headers" 
    },
    { 
      id: "creative", 
      name: "Creative", 
      description: "Artistic style"
    },
    { 
      id: "minimalist", 
      name: "Minimalist", 
      description: "Clean & sparse"
    },
    { 
      id: "professional", 
      name: "Professional", 
      description: "Corporate layout"
    },
    { 
      id: "elegant", 
      name: "Elegant", 
      description: "Serif & doubles"
    },
    { 
      id: "tech", 
      name: "Tech", 
      description: "Monospace / Cyber"
    },
    { 
      id: "brutalist", 
      name: "Brutalist", 
      description: "Bold & High Contrast"
    },
    { 
      id: "classic", 
      name: "Classic", 
      description: "Traditional Boxed"
    },
    { 
      id: "compact", 
      name: "Compact", 
      description: "Dense & Efficient"
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <DockIconButton
          icon={Palette}
          label="Theme & Colors"
          mouseX={mouseX}
          magnification={magnification}
          distance={distance}
        />
      </SheetTrigger>
      <SheetContent side="bottom" className="dark:bg-neutral-900 border-t border-border/50 max-h-[50vh] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-center">Customize Invoice Appearance</SheetTitle>
        </SheetHeader>
        
        <div className="grid md:grid-cols-2 gap-8 mx-auto pb-8">
            <div className="space-y-4 w-full mx-auto">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Theme
                </h3>
                <RadioGroup
                value={theme}
                onValueChange={(value) => updateField("theme", value)}
                className="grid grid-cols-6 gap-3"
                >
                {themes.map((t) => (
                    <div key={t.id}>
                    <RadioGroupItem
                        value={t.id}
                        id={t.id}
                        className="peer sr-only"
                    />
                    <Label
                        htmlFor={t.id}
                        className={cn(
                        "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all h-full text-center",
                        theme === t.id && "border-primary bg-primary/5"
                        )}
                    >
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground font-normal line-clamp-1">
                        {t.description}
                        </div>
                    </Label>
                    </div>
                ))}
                </RadioGroup>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
