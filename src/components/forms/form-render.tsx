"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/types/form";

interface FormRendererProps {
  title: string;
  description?: string;
  fields: FormField[];
  onSubmit: (data: any) => void;
}

export function FormRenderer({
  title,
  description,
  fields,
  onSubmit,
}: FormRendererProps) {
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (id: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="text-3xl">{title}</CardTitle>
            {description && (
              <CardDescription className="text-lg mt-2">
                {description}
              </CardDescription>
            )}
          </CardHeader>
        </Card>

        {fields.map((field) => (
          <Card key={field.id}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  {field.label}
                  {field.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </Label>

                {field.type === "text" && (
                  <Input
                    required={field.required}
                    placeholder={field.placeholder}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                )}

                {field.type === "email" && (
                  <Input
                    type="email"
                    required={field.required}
                    placeholder={field.placeholder}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                )}

                {field.type === "number" && (
                  <Input
                    type="number"
                    required={field.required}
                    placeholder={field.placeholder}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                )}

                {field.type === "textarea" && (
                  <Textarea
                    required={field.required}
                    placeholder={field.placeholder}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                )}

                {field.type === "radio" && field.options && (
                  <RadioGroup
                    onValueChange={(val: any) => handleChange(field.id, val)}
                  >
                    {field.options.map((opt, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`${field.id}-${idx}`} />
                        <Label
                          htmlFor={`${field.id}-${idx}`}
                          className="font-normal"
                        >
                          {opt}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {field.type === "checkbox" && field.options && (
                  <div className="space-y-2">
                    {field.options.map((opt, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${field.id}-${idx}`}
                          onCheckedChange={(checked) => {
                            const current = formData[field.id] || [];
                            if (checked) {
                              handleChange(field.id, [...current, opt]);
                            } else {
                              handleChange(
                                field.id,
                                current.filter((v: string) => v !== opt)
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={`${field.id}-${idx}`}
                          className="font-normal"
                        >
                          {opt}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}

                {field.type === "dropdown" && field.options && (
                  <Select onValueChange={(val) => handleChange(field.id, val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((opt, idx) => (
                        <SelectItem key={idx} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="submit" size="lg" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
