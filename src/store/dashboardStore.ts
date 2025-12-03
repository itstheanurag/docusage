import { create } from "zustand";
import { DashboarSectionType } from "@/types/dashboard";

interface DashboardState {
  currentSection: DashboarSectionType;
  isMobileMenuOpen: boolean;
  isCollapsed: boolean;
  setCurrentSection: (section: DashboarSectionType) => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setIsCollapsed: (isCollapsed: boolean) => void;
  toggleMobileMenu: () => void;
  toggleCollapse: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  currentSection: "overview",
  isMobileMenuOpen: false,
  isCollapsed: false,
  setCurrentSection: (section) => set({ currentSection: section }),
  setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  setIsCollapsed: (isCollapsed) => set({ isCollapsed }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
