import { DisplayApiKey } from "@/types";

export interface ApiKeyStore {
  apiKeys: DisplayApiKey[];
  isLoading: boolean;
  isCreateModalOpen: boolean;
  newKeyName: string;
  isCreating: boolean;
  newlyCreatedKey: DisplayApiKey | null;
  // Form State
  permissions: string;
  expiresAt: string | null;
  rateLimitEnabled: boolean;
  rateLimitMax: number;
  rateLimitWindowHours: number;
  refillIntervalHours: number | null;
  refillAmount: number | null;
  metadata: string;

  selectedKey: DisplayApiKey | null;

  setPermissions: (permissions: string) => void;
  setExpiresAt: (date: string | null) => void;
  setRateLimitEnabled: (enabled: boolean) => void;
  setRateLimitMax: (max: number) => void;
  setRateLimitWindowHours: (hours: number) => void;
  setRefillIntervalHours: (hours: number | null) => void;
  setRefillAmount: (amount: number | null) => void;
  setMetadata: (metadata: string) => void;

  setApiKeys: (keys: DisplayApiKey[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsCreateModalOpen: (isOpen: boolean) => void;
  setNewKeyName: (name: string) => void;
  setIsCreating: (isCreating: boolean) => void;
  setNewlyCreatedKey: (key: DisplayApiKey | null) => void;
  setSelectedKey: (key: DisplayApiKey | null) => void;

  fetchApiKeys: () => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createApiKey: (payload: any) => Promise<void>;
  deleteApiKey: (id: string) => Promise<void>;
  toggleApiKey: (id: string, enabled: boolean) => Promise<void>;
  updateApiKey: (id: string, patch: Partial<DisplayApiKey>) => Promise<void>;
  closeCreateModal: () => void;
}
