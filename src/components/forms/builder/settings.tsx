import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Image as ImageIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormBuilderStore } from "@/store/form-builder-store";

export default function SettingsPanel() {
  const { 
    logoUrl, 
    setLogoUrl, 
    submitButtonText, 
    setSubmitButtonText, 
    successMessage, 
    setSuccessMessage 
  } = useFormBuilderStore();

  return (
    <div className="w-full max-w-3xl">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          General Settings
        </h3>

        <div className="space-y-4">
          <div>
            <Label>Logo URL</Label>
            <div className="flex gap-2">
              <Input
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
              />
              <Button variant="outline">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <Label>Submit Button Text</Label>
            <Input 
              value={submitButtonText} 
              onChange={(e) => setSubmitButtonText(e.target.value)}
            />
          </div>

          <div>
            <Label>Success Message</Label>
            <Input 
              value={successMessage} 
              onChange={(e) => setSuccessMessage(e.target.value)}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
