import { create } from "zustand";
import { ManagementState } from "@/types/management";
import {
  MOCK_DOCUMENTS,
  MOCK_FORMS,
  MOCK_INVOICES,
  MOCK_RECENT_ACTIVITIES,
  MOCK_OVERVIEW_STATS,
  MOCK_CODE_SNIPPETS,
} from "@/data/mock-management";

export const useManagementStore = create<ManagementState>((set) => ({
  documents: [],
  forms: [],
  invoices: [],
  recentActivities: [],
  overviewStats: [],
  codeSnippets: [],
  whiteboards: [],
  isLoading: false,

  setDocuments: (documents) => set({ documents }),
  setForms: (forms) => set({ forms }),
  setInvoices: (invoices) => set({ invoices }),
  setRecentActivities: (recentActivities) => set({ recentActivities }),
  setOverviewStats: (overviewStats) => set({ overviewStats }),
  setCodeSnippets: (codeSnippets) => set({ codeSnippets }),
  setWhiteboards: (whiteboards) => set({ whiteboards }),
  setLoading: (isLoading) => set({ isLoading }),

  fetchData: async () => {
    set({ isLoading: true });
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    set({
      documents: MOCK_DOCUMENTS,
      forms: MOCK_FORMS,
      invoices: MOCK_INVOICES,
      recentActivities: MOCK_RECENT_ACTIVITIES,
      overviewStats: MOCK_OVERVIEW_STATS,
      codeSnippets: MOCK_CODE_SNIPPETS,
      whiteboards: [],
      isLoading: false,
    });
  },
}));
