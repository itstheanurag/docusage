import { create } from "zustand";
import { DisplayApiKey } from "@/types";
import {
  listApiKeys,
  createApiKey,
  deleteApiKey,
  updateApiKey,
  toggleApiKeyEnabled,
} from "@/actions/apiKeys";
import { toast } from "sonner";

interface ApiKeyStore {
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
  createApiKey: (payload: any) => Promise<void>;
  deleteApiKey: (id: string) => Promise<void>;
  toggleApiKey: (id: string, enabled: boolean) => Promise<void>;
  updateApiKey: (id: string, patch: Partial<DisplayApiKey>) => Promise<void>;
  closeCreateModal: () => void;
}

export const useApiKeyStore = create<ApiKeyStore>((set, get) => ({
  apiKeys: [],
  isLoading: false,
  isCreateModalOpen: false,
  newKeyName: "",
  isCreating: false,
  newlyCreatedKey: null,
  selectedKey: null,

  // Form State Defaults
  permissions: "",
  expiresAt: null,
  rateLimitEnabled: false,
  rateLimitMax: 1000,
  rateLimitWindowHours: 1,
  refillIntervalHours: null,
  refillAmount: null,
  metadata: "",

  setPermissions: (permissions) => set({ permissions }),
  setExpiresAt: (expiresAt) => set({ expiresAt }),
  setRateLimitEnabled: (rateLimitEnabled) => set({ rateLimitEnabled }),
  setRateLimitMax: (rateLimitMax) => set({ rateLimitMax }),
  setRateLimitWindowHours: (rateLimitWindowHours) =>
    set({ rateLimitWindowHours }),
  setRefillIntervalHours: (refillIntervalHours) => set({ refillIntervalHours }),
  setRefillAmount: (refillAmount) => set({ refillAmount }),
  setMetadata: (metadata) => set({ metadata }),

  setApiKeys: (keys) => set({ apiKeys: keys }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsCreateModalOpen: (isOpen) => set({ isCreateModalOpen: isOpen }),
  setNewKeyName: (name) => set({ newKeyName: name }),
  setIsCreating: (isCreating) => set({ isCreating }),
  setNewlyCreatedKey: (key) => set({ newlyCreatedKey: key }),
  setSelectedKey: (key) => set({ selectedKey: key }),

  fetchApiKeys: async () => {
    set({ isLoading: true });
    try {
      const apiKeys = await listApiKeys();
      set({ apiKeys });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      set({ isLoading: false });
    }
  },

  createApiKey: async (payload: any) => {
    set({ isCreating: true });
    try {
      const apiKey = await createApiKey(payload);
      set((state) => ({
        apiKeys: [apiKey, ...state.apiKeys],
        newlyCreatedKey: apiKey,
        newKeyName: "",
      }));
      toast.success("API key created successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      set({ isCreating: false });
    }
  },

  deleteApiKey: async (id) => {
    try {
      await deleteApiKey(id);
      set((state) => ({
        apiKeys: state.apiKeys.filter((key) => key.id !== id),
        selectedKey: state.selectedKey?.id === id ? null : state.selectedKey,
      }));
      toast.success("API key deleted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  },

  toggleApiKey: async (id, enabled) => {
    try {
      const updatedKey = await toggleApiKeyEnabled(id, enabled);
      set((state) => ({
        apiKeys: state.apiKeys.map((key) =>
          key.id === id ? { ...key, enabled } : key
        ),
      }));
      toast.success(`API key ${enabled ? "enabled" : "disabled"}`);
    } catch (err) {
      toast.error("Failed to update API key");
    }
  },

  updateApiKey: async (id, patch) => {
    try {
      const updatedKey = await updateApiKey(id, patch);
      set((state) => ({
        apiKeys: state.apiKeys.map((key) =>
          key.id === id ? { ...key, ...patch } : key
        ),
        selectedKey:
          state.selectedKey?.id === id
            ? { ...state.selectedKey, ...patch }
            : state.selectedKey,
      }));
      toast.success("API key updated successfully.");
    } catch (err) {
      toast.error("Failed to update API key");
    }
  },

  closeCreateModal: () => {
    set({
      isCreateModalOpen: false,
      newKeyName: "",
      newlyCreatedKey: null,
    });
  },
}));
