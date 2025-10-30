"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface ApiKey {
  id: string;
  key: string;
  createdAt: string;
}

export function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/keys");
      if (!res.ok) {
        throw new Error("Failed to fetch API keys");
      }
      const data = await res.json();
      setApiKeys(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const generateApiKey = async () => {
    try {
      const res = await fetch("/api/keys", { method: "POST" });
      if (!res.ok) {
        throw new Error("Failed to generate API key");
      }
      fetchApiKeys();
      toast.success("API key generated successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const deleteApiKey = async (id: string) => {
    try {
      const res = await fetch(`/api/keys/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to delete API key");
      }
      fetchApiKeys();
      toast.success("API key deleted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button onClick={generateApiKey}>Generate API Key</Button>
        </div>
        <div className="space-y-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-mono text-sm">{apiKey.key}</p>
                  <p className="text-xs text-muted-foreground">
                    Created on {new Date(apiKey.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteApiKey(apiKey.id)}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
