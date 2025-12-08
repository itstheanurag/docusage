import { FormBuilder } from "@/components/forms/form-builder";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Save, Share2 } from "lucide-react";
import Link from "next/link";

export default function NewFormPage() {
  return (
    <div className="h-screen bg-background flex flex-col">
      <main className="flex-1 overflow-hidden">
        <FormBuilder />
      </main>
    </div>
  );
}
