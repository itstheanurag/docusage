import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Key } from "lucide-react";
import { useApiKeyStore } from "@/store/apiKeyStore";

export function ApiKeyManagerHeader() {
  const { setIsCreateModalOpen } = useApiKeyStore();

  return (
    <div className="flex items-center justify-between">
      <div>
        <CardTitle className="text-2xl">API Keys</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your API keys for secure access to your account
        </p>
      </div>
      <Button onClick={() => setIsCreateModalOpen(true)} size="lg">
        <Key className="mr-2 h-4 w-4" /> Create New Key
      </Button>
    </div>
  );
}
