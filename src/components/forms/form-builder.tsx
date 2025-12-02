"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Type,
  Hash,
  Mail,
  AlignLeft,
  CheckSquare,
  CircleDot,
  ChevronDown,
  Calendar,
  Clock,
  Upload,
  Star,
  PenTool,
  Trash2,
  Settings,
  Plus,
  Image as ImageIcon,
} from "lucide-react";

export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "number"
  | "radio"
  | "checkbox"
  | "dropdown"
  | "date"
  | "time"
  | "file"
  | "rating"
  | "signature";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // for radio, checkbox, dropdown
  step: number;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

const FIELD_TYPES: { type: FieldType; icon: any; label: string }[] = [
  { type: "text", icon: Type, label: "Short Text" },
  { type: "textarea", icon: AlignLeft, label: "Long Text" },
  { type: "email", icon: Mail, label: "Email" },
  { type: "number", icon: Hash, label: "Number" },
  { type: "checkbox", icon: CheckSquare, label: "Checkbox" },
  { type: "radio", icon: CircleDot, label: "Radio" },
  { type: "dropdown", icon: ChevronDown, label: "Dropdown" },
  { type: "date", icon: Calendar, label: "Date" },
  { type: "time", icon: Clock, label: "Time" },
  { type: "file", icon: Upload, label: "File Upload" },
  { type: "rating", icon: Star, label: "Rating" },
  { type: "signature", icon: PenTool, label: "Signature" },
];

export function FormBuilder() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");

  // New features state
  const [activeTab, setActiveTab] = useState<"build" | "settings">("build");
  const [steps, setSteps] = useState([1]);
  const [currentStep, setCurrentStep] = useState(1);
  const [logoUrl, setLogoUrl] = useState("");

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      type,
      label: "New Question",
      required: false,
      options: ["Option 1", "Option 2", "Option 3"],
      step: currentStep,
    };
    setFields([...fields, newField]);
    setSelectedFieldId(newField.id);
  };

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Left Sidebar - Palette */}
      <div className="w-64 border-r bg-background p-4 flex flex-col gap-4 overflow-y-auto">
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

      {/* Center - Canvas */}
      <div className="flex-1 bg-muted/30 p-8 overflow-y-auto flex flex-col">
        {/* Top Bar */}
        <div className="mb-6 flex justify-between items-center bg-background p-2 rounded-lg border shadow-sm">
          <div className="flex gap-1">
            <Button
              variant={activeTab === "build" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("build")}
              size="sm"
            >
              Build
            </Button>
            <Button
              variant={activeTab === "settings" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("settings")}
              size="sm"
            >
              Settings
            </Button>
          </div>

          {activeTab === "build" && (
            <div className="flex gap-1 items-center">
              <span className="text-sm text-muted-foreground mr-2">Steps:</span>
              {steps.map((s) => (
                <Button
                  key={s}
                  variant={currentStep === s ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setCurrentStep(s)}
                >
                  {s}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  const newStep = steps.length + 1;
                  setSteps([...steps, newStep]);
                  setCurrentStep(newStep);
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {activeTab === "build" ? (
          <div className="max-w-3xl mx-auto space-y-6 w-full">
            {/* Form Header */}
            <Card className="p-6 border-t-4 border-t-primary relative overflow-hidden">
              {logoUrl && (
                <div className="mb-4">
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="h-16 object-contain"
                  />
                </div>
              )}
              <Input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="text-3xl font-bold border-none px-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/50"
                placeholder="Form Title"
              />
              <Input
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="text-muted-foreground border-none px-0 mt-2 focus-visible:ring-0"
                placeholder="Form Description"
              />
              <div className="absolute top-4 right-4 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                Step {currentStep} of {steps.length}
              </div>
            </Card>

            {/* Fields List */}
            <div className="space-y-4">
              {fields.filter((f) => f.step === currentStep).length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground bg-background/50">
                  <p>
                    Click a field type from the left to add it to Step{" "}
                    {currentStep}.
                  </p>
                </div>
              ) : (
                fields
                  .filter((f) => f.step === currentStep)
                  .map((field) => (
                    <Card
                      key={field.id}
                      className={`p-6 cursor-pointer transition-all ${selectedFieldId === field.id ? "ring-2 ring-primary" : "hover:border-primary/50"}`}
                      onClick={() => setSelectedFieldId(field.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Label className="text-base font-medium">
                          {field.label}{" "}
                          {field.required && (
                            <span className="text-destructive">*</span>
                          )}
                        </Label>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFields(
                                fields.filter((f) => f.id !== field.id)
                              );
                              if (selectedFieldId === field.id)
                                setSelectedFieldId(null);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Field Preview */}
                      <div className="pointer-events-none opacity-60">
                        {field.type === "text" && (
                          <Input
                            disabled
                            placeholder={
                              field.placeholder || "Short answer text"
                            }
                          />
                        )}
                        {field.type === "textarea" && (
                          <div className="h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm">
                            Long answer text
                          </div>
                        )}
                        {field.type === "email" && (
                          <Input
                            disabled
                            type="email"
                            placeholder="email@example.com"
                          />
                        )}
                        {field.type === "number" && (
                          <Input disabled type="number" placeholder="0" />
                        )}
                        {(field.type === "radio" ||
                          field.type === "checkbox" ||
                          field.type === "dropdown") && (
                          <div className="space-y-2">
                            {field.options?.map((opt, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-muted-foreground"
                              >
                                {field.type === "radio" && (
                                  <div className="h-4 w-4 rounded-full border" />
                                )}
                                {field.type === "checkbox" && (
                                  <div className="h-4 w-4 rounded border" />
                                )}
                                {field.type === "dropdown" && i === 0 && (
                                  <div className="h-9 w-full rounded-md border flex items-center px-3">
                                    Dropdown
                                  </div>
                                )}
                                {field.type !== "dropdown" && (
                                  <span>{opt}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6 w-full">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo URL</Label>
                  <div className="flex gap-2">
                    <Input
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://example.com/logo.png"
                    />
                    <Button variant="outline" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter a URL for your form logo.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Submit Button Text</Label>
                  <Input placeholder="Submit" defaultValue="Submit" />
                </div>

                <div className="space-y-2">
                  <Label>Success Message</Label>
                  <Input
                    placeholder="Thank you for your submission!"
                    defaultValue="Thank you for your submission!"
                  />
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Right Sidebar - Properties */}
      <div className="w-80 border-l bg-background p-4 overflow-y-auto">
        <h2 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wider">
          Properties
        </h2>

        {selectedField ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Label</Label>
              <Input
                value={selectedField.label}
                onChange={(e) => {
                  setFields(
                    fields.map((f) =>
                      f.id === selectedField.id
                        ? { ...f, label: e.target.value }
                        : f
                    )
                  );
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Placeholder</Label>
              <Input
                value={selectedField.placeholder || ""}
                onChange={(e) => {
                  setFields(
                    fields.map((f) =>
                      f.id === selectedField.id
                        ? { ...f, placeholder: e.target.value }
                        : f
                    )
                  );
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Required</Label>
              <input
                type="checkbox"
                checked={selectedField.required}
                onChange={(e) => {
                  setFields(
                    fields.map((f) =>
                      f.id === selectedField.id
                        ? { ...f, required: e.target.checked }
                        : f
                    )
                  );
                }}
                className="h-4 w-4"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase text-muted-foreground">
                Validation
              </Label>
              {(selectedField.type === "number" ||
                selectedField.type === "text") && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Min</Label>
                    <Input
                      type="number"
                      value={selectedField.validation?.min || ""}
                      onChange={(e) => {
                        const val = e.target.value
                          ? parseInt(e.target.value)
                          : undefined;
                        setFields(
                          fields.map((f) =>
                            f.id === selectedField.id
                              ? {
                                  ...f,
                                  validation: { ...f.validation, min: val },
                                }
                              : f
                          )
                        );
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Max</Label>
                    <Input
                      type="number"
                      value={selectedField.validation?.max || ""}
                      onChange={(e) => {
                        const val = e.target.value
                          ? parseInt(e.target.value)
                          : undefined;
                        setFields(
                          fields.map((f) =>
                            f.id === selectedField.id
                              ? {
                                  ...f,
                                  validation: { ...f.validation, max: val },
                                }
                              : f
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              )}
              {selectedField.type === "text" && (
                <div className="space-y-1">
                  <Label className="text-xs">Regex Pattern</Label>
                  <Input
                    value={selectedField.validation?.pattern || ""}
                    onChange={(e) => {
                      setFields(
                        fields.map((f) =>
                          f.id === selectedField.id
                            ? {
                                ...f,
                                validation: {
                                  ...f.validation,
                                  pattern: e.target.value,
                                },
                              }
                            : f
                        )
                      );
                    }}
                    placeholder="e.g. [A-Za-z]+"
                  />
                </div>
              )}
            </div>

            <Separator />

            {(selectedField.type === "radio" ||
              selectedField.type === "checkbox" ||
              selectedField.type === "dropdown") && (
              <div className="space-y-2">
                <Label>Options</Label>
                <div className="space-y-2">
                  {selectedField.options?.map((opt, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        value={opt}
                        onChange={(e) => {
                          const newOptions = [...(selectedField.options || [])];
                          newOptions[idx] = e.target.value;
                          setFields(
                            fields.map((f) =>
                              f.id === selectedField.id
                                ? { ...f, options: newOptions }
                                : f
                            )
                          );
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newOptions = selectedField.options?.filter(
                            (_, i) => i !== idx
                          );
                          setFields(
                            fields.map((f) =>
                              f.id === selectedField.id
                                ? { ...f, options: newOptions }
                                : f
                            )
                          );
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      const newOptions = [
                        ...(selectedField.options || []),
                        `Option ${(selectedField.options?.length || 0) + 1}`,
                      ];
                      setFields(
                        fields.map((f) =>
                          f.id === selectedField.id
                            ? { ...f, options: newOptions }
                            : f
                        )
                      );
                    }}
                  >
                    Add Option
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <Settings className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p>Select a field to edit its properties</p>
          </div>
        )}
      </div>
    </div>
  );
}
