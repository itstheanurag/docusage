import { FormBuilder } from "@/components/forms/form-builder";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Save, Share2 } from "lucide-react";
import Link from "next/link";

export default function EditFormPage() {
  return (
    <div className="h-screen bg-background flex flex-col">
      <header className="border-b px-6 py-3 flex items-center justify-between bg-background z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/forms"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="h-6 w-px bg-border" />
          <span className="font-bold text-lg">Edit Form</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
          <Button size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <FormBuilder />
      </main>
    </div>
  );
}
