export interface Stat {
  label: string;
  value: string;
}

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string | null;
  joinDate: string;
  logoUrl: string;
}

export interface ProfileState {
  profile: ProfileData;
  editedProfile: ProfileData;
  isEditing: boolean;
  stats: Stat[];

  // Actions
  setProfile: (profile: ProfileData) => void;
  setEditedProfile: (profile: ProfileData) => void;
  updateEditedProfile: (updates: Partial<ProfileData>) => void;
  setIsEditing: (isEditing: boolean) => void;
  saveProfile: () => void;
  cancelEdit: () => void;
}
