import { LoginInput, RegisterInput } from ".";

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  image?: string;
  provider?: string;
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthStateStore {
  // --- Auth state ---
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // --- Auth actions ---
  login: (data: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  restoreAuth: () => void;
  register: (data: RegisterInput) => Promise<void>;

  // --- Form state for registration/login ---
  formData: RegisterInput;
  showPassword: boolean;
  showConfirmPassword: boolean;
  agreedToTerms: boolean;

  // --- Form state setters ---
  setFormData: (data: Partial<RegisterInput>) => void;
  setShowPassword: (value: boolean) => void;
  setShowConfirmPassword: (value: boolean) => void;
  setAgreedToTerms: (value: boolean) => void;
}
