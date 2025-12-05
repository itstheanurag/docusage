import { create } from "zustand";

interface DashboardState {
  isMobileMenuOpen: boolean;
  isCollapsed: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setIsCollapsed: (isCollapsed: boolean) => void;
  toggleMobileMenu: () => void;
  toggleCollapse: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isMobileMenuOpen: false,
  isCollapsed: false,
  setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  setIsCollapsed: (isCollapsed) => set({ isCollapsed }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
