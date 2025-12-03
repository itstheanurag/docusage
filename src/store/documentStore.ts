import { create } from "zustand";

interface User {
  id: string;
  name: string;
  color: string;
}

interface DocumentState {
  title: string;
  content: string;
  history: string[];
  historyIndex: number;
  users: User[];
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  undo: () => void;
  redo: () => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  title: "Untitled Document",
  content: "",
  history: [],
  historyIndex: -1,
  users: [{ id: "user-1", name: "You", color: "#3b82f6" }],

  setTitle: (title: string) => {
    set({ title });
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
