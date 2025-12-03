"use client";

import { useFormBuilderStore } from "@/store/form-builder-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Calendar, Clock, Upload, Star, PenTool } from "lucide-react";

export default function FormPreview() {
  const {
    fields,
    formTitle,
    formDescription,
    steps,
    currentStep,
    logoUrl,
    setCurrentStep,
  } = useFormBuilderStore();

  const currentFields = fields.filter((f) => f.step === currentStep);

  return (
    <div className="flex-1 bg-muted/30 p-8 overflow-y-auto flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <Card className="p-8 border-t-4 border-t-primary">
          {logoUrl && (
            <div className="mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                className="h-16 object-contain"
                alt="Form Logo"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold mb-2">{formTitle}</h1>
          <p className="text-muted-foreground whitespace-pre-wrap">
            {formDescription}
          </p>
        </Card>

        {/* Fields */}
        <Card className="p-8 space-y-6">
          {currentFields.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No fields in this step.
            </p>
          ) : (
            currentFields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label className="text-base font-medium">
                  {field.label}
                  {field.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </Label>

                {field.type === "text" && (
                  <Input placeholder={field.placeholder} />
                )}

                {field.type === "textarea" && (
                  <Textarea placeholder={field.placeholder} />
                )}

                {field.type === "email" && (
                  <Input type="email" placeholder={field.placeholder} />
                )}

                {field.type === "number" && (
                  <Input type="number" placeholder={field.placeholder} />
                )}

                {field.type === "radio" && (
                  <RadioGroup>
                    {field.options?.map((opt, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={opt}
                          id={`${field.id}-opt-${i}`}
                        />
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
                    <Input type="time" className="w-full" />
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}

                {field.type === "file" && (
                  <div className="border-2 border-dashed rounded-lg p-6 text-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Click to upload or drag and drop</p>
                  </div>
                )}

                {field.type === "rating" && (
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className="focus:outline-none hover:scale-110 transition-transform"
                      >
                        <Star className="h-8 w-8 text-muted-foreground/30 hover:text-yellow-400 hover:fill-yellow-400 transition-colors" />
                      </button>
                    ))}
                  </div>
                )}

                {field.type === "signature" && (
                  <div className="border rounded-md p-4 bg-muted/5 h-32 flex items-center justify-center text-muted-foreground cursor-crosshair hover:bg-muted/10 transition-colors">
                    <PenTool className="h-4 w-4 mr-2" />
                    <span className="text-sm">Sign here</span>
                  </div>
                )}
              </div>
            ))
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </Button>
            {currentStep < steps.length ? (
              <Button onClick={() => setCurrentStep(currentStep + 1)}>
                Next
              </Button>
            ) : (
              <Button>Submit</Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
