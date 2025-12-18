import { create } from "zustand";
import { DashboardState } from "@/types/dashboard";

export const useDashboardStore = create<DashboardState>((set) => ({
  isMobileMenuOpen: false,
  isCollapsed: false,
  setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  setIsCollapsed: (isCollapsed) => set({ isCollapsed }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
