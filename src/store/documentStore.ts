import { create } from "zustand";

interface User {
  id: string;
  name: string;
  color: string;
}

interface Variable {
  id: string;
  name: string;
  label: string;
  type: "text" | "number" | "date";
  defaultValue?: string;
}

interface DataSet {
  id: string;
  name: string;
  data: Record<string, string>;
}

interface DocumentState {
  title: string;
  content: string;
  isTemplate: boolean;
  variables: Variable[];
  dataSets: DataSet[];
  selectedDataSetId: string | null;
  history: string[];
  historyIndex: number;
  users: User[];
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setIsTemplate: (isTemplate: boolean) => void;
  addVariable: (variable: Variable) => void;
  removeVariable: (variableId: string) => void;
  updateVariable: (variableId: string, updates: Partial<Variable>) => void;
  addDataSet: (dataSet: DataSet) => void;
  removeDataSet: (dataSetId: string) => void;
  updateDataSet: (dataSetId: string, updates: Partial<DataSet>) => void;
  setSelectedDataSet: (dataSetId: string | null) => void;
  undo: () => void;
  redo: () => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
}

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
