import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, Clock, Upload, Star, PenTool } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormBuilderStore } from "@/store/form-builder-store";
import { FormField } from "@/types/form";

export default function FieldCard({ field }: { field: FormField }) {
  const { selectedFieldId, setSelectedFieldId, removeField } =
    useFormBuilderStore();

  const remove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeField(field.id);
  };

  return (
    <Card
      className={`p-6 cursor-pointer transition-all ${
        selectedFieldId === field.id
          ? "ring-2 ring-primary border-primary"
          : "hover:border-primary/50"
      }`}
      onClick={() => setSelectedFieldId(field.id)}
    >
      <div className="flex justify-between items-start mb-4">
        <Label className="text-base font-medium">
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>

        <Button
          variant="ghost"
          size="icon"
          onClick={remove}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* PREVIEW */}
      <div className="pointer-events-none">
        {field.type === "text" && (
          <Input
            placeholder={field.placeholder || "Short answer text"}
            readOnly
          />
        )}

        {field.type === "textarea" && (
          <Textarea
            placeholder={field.placeholder || "Long answer text"}
            readOnly
          />
        )}

        {field.type === "email" && (
          <Input
            type="email"
            placeholder={field.placeholder || "email@example.com"}
            readOnly
          />
        )}

        {field.type === "number" && (
          <Input
            type="number"
            placeholder={field.placeholder || "0"}
            readOnly
          />
        )}

        {field.type === "radio" && (
          <RadioGroup>
            {field.options?.map((opt, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem value={opt} id={`${field.id}-opt-${i}`} />
                <Label htmlFor={`${field.id}-opt-${i}`}>{opt}</Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {field.type === "checkbox" && (
          <div className="space-y-2">
            {field.options?.map((opt, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Checkbox id={`${field.id}-check-${i}`} />
                <Label htmlFor={`${field.id}-check-${i}`}>{opt}</Label>
              </div>
            ))}
          </div>
        )}

        {field.type === "dropdown" && (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt, i) => (
                <SelectItem key={i} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {field.type === "date" && (
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <Calendar className="mr-2 h-4 w-4" />
            <span>Pick a date</span>
          </Button>
        )}

        {field.type === "time" && (
          <div className="flex items-center gap-2">
            <Input type="time" className="w-full" readOnly />
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
        )}

        {field.type === "file" && (
          <div className="border-2 border-dashed rounded-lg p-6 text-center text-muted-foreground">
            <Upload className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Click to upload or drag and drop</p>
          </div>
        )}

        {field.type === "rating" && (
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-6 w-6 text-muted-foreground/30" />
            ))}
          </div>
        )}

        {field.type === "signature" && (
          <div className="border rounded-md p-4 bg-muted/10 h-24 flex items-center justify-center text-muted-foreground">
            <PenTool className="h-4 w-4 mr-2" />
            <span className="text-sm">Sign here</span>
          </div>
        )}
      </div>
    </Card>
  );
}
