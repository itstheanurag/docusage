import { create } from "zustand";
import { User, Variable, DataSet, DocumentState } from "@/types/document";

export const useDocumentStore = create<DocumentState>((set, get) => ({
  title: "Untitled Document",
  content: "",
  isTemplate: false,
  variables: [],
  dataSets: [],
  selectedDataSetId: null,
  history: [],
  historyIndex: -1,
  users: [{ id: "user-1", name: "You", color: "#3b82f6" }],

  setTitle: (title: string) => {
    set({ title });
  },

  setIsTemplate: (isTemplate: boolean) => {
    set({ isTemplate });
  },

  addVariable: (variable: Variable) => {
    set((state) => ({ variables: [...state.variables, variable] }));
  },

  removeVariable: (variableId: string) => {
    set((state) => ({
      variables: state.variables.filter((v) => v.id !== variableId),
    }));
  },

  updateVariable: (variableId: string, updates: Partial<Variable>) => {
    set((state) => ({
      variables: state.variables.map((v) =>
        v.id === variableId ? { ...v, ...updates } : v
      ),
    }));
  },

  addDataSet: (dataSet: DataSet) => {
    set((state) => ({ dataSets: [...state.dataSets, dataSet] }));
  },

  removeDataSet: (dataSetId: string) => {
    set((state) => ({
      dataSets: state.dataSets.filter((d) => d.id !== dataSetId),
    }));
  },

  updateDataSet: (dataSetId: string, updates: Partial<DataSet>) => {
    set((state) => ({
      dataSets: state.dataSets.map((d) =>
        d.id === dataSetId ? { ...d, ...updates } : d
      ),
    }));
  },

  setSelectedDataSet: (dataSetId: string | null) => {
    set({ selectedDataSetId: dataSetId });
  },

  setContent: (content: string) => {
    const { history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(content);
    set({
      content,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex > 0) {
      set({
        historyIndex: historyIndex - 1,
        content: history[historyIndex - 1],
      });
    }
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      set({
        historyIndex: historyIndex + 1,
        content: history[historyIndex + 1],
      });
    }
  },

  addUser: (user: User) => {
    set((state) => ({ users: [...state.users, user] }));
  },

  removeUser: (userId: string) => {
    set((state) => ({ users: state.users.filter((u) => u.id !== userId) }));
  },
}));
