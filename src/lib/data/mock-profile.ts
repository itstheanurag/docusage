import { ProfileData, Stat } from "@/types/profile";

export const INITIAL_PROFILE_DATA: ProfileData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  bio: "",
  avatar: null,
  joinDate: "",
  logoUrl: "",
};

export const MOCK_PROFILE_STATS: Stat[] = [
  { label: "Documents Created", value: "127" },
  { label: "Invoices Generated", value: "43" },
  { label: "Templates Used", value: "18" },
  { label: "Storage Used", value: "2.4 GB" },
];
