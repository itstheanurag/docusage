import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { useApiKeyStore } from "@/stores/apiKeyStore";

export function EmptyState() {
  const { setIsCreateModalOpen } = useApiKeyStore();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed rounded-lg">
      <div className="rounded-full bg-muted p-3 mb-4">
        <Key className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-1">No API Keys</h3>
      <p className="text-sm text-muted-foreground text-center mb-4">
        Create your first API key to get started with the API
      </p>
      <Button onClick={() => setIsCreateModalOpen(true)}>
        <Key className="mr-2 h-4 w-4" /> Create Your First Key
      </Button>
    </div>
  );
}
