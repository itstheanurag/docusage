import { create } from "zustand";
import { IAuthStateStore, IUser } from "@/types/auth";
import { LoginInput, RegisterInput } from "@/types";
import { tokenStorage } from "@/lib/storage";

export const useAuthStore = create<IAuthStateStore>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,

  // Form states for registration/login
  formData: {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  showPassword: false,
  showConfirmPassword: false,
  agreedToTerms: false,

  setFormData: (data: Partial<RegisterInput>) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setShowPassword: (value: boolean) => set({ showPassword: value }),
  setShowConfirmPassword: (value: boolean) =>
    set({ showConfirmPassword: value }),
  setAgreedToTerms: (value: boolean) => set({ agreedToTerms: value }),

  // --- Auth actions ---
  restoreAuth: () => {
    const storedUser = tokenStorage.getUser();
    const storedToken = tokenStorage.getToken();

    if (storedUser && storedToken) {
      set({
        user: storedUser,
        token: storedToken,
        isAuthenticated: true,
        isLoading: false,
      });
      console.log("[AuthStore] Restored auth:", {
        user: storedUser,
        token: storedToken,
      });
    } else {
      set({ isLoading: false });
    }
  },

  login: async ({ email, password }: LoginInput) => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Login failed");

      const userData: IUser = result.data.user;
      const userToken: string = result.data.token;

      set({
        user: userData,
        token: userToken,
        isAuthenticated: true,
        isLoading: false,
      });

      tokenStorage.setUser(userData);
      tokenStorage.setToken(userToken);
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data: RegisterInput) => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Registration failed");

      console.log("[AuthStore] Registration success:", result);
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    fetch("/api/auth/logout", { method: "POST" }).catch(console.error);
    set({ user: null, token: null, isAuthenticated: false });
    tokenStorage.clear();
  },
}));
