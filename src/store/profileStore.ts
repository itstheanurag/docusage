import { create } from "zustand";
import { ProfileState } from "@/types/profile";
import {
  INITIAL_PROFILE_DATA,
  MOCK_PROFILE_STATS,
} from "@/data/mock-profile";

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: INITIAL_PROFILE_DATA,
  editedProfile: INITIAL_PROFILE_DATA,
  isEditing: false,
  stats: MOCK_PROFILE_STATS,

  setProfile: (profile) => set({ profile, editedProfile: profile }),
  setEditedProfile: (editedProfile) => set({ editedProfile }),
  updateEditedProfile: (updates) =>
    set((state) => ({ editedProfile: { ...state.editedProfile, ...updates } })),
  setIsEditing: (isEditing) => set({ isEditing }),

  saveProfile: () => {
    const { editedProfile } = get();
    set({ profile: editedProfile, isEditing: false });
    // In a real app, you'd call an API here
  },

  cancelEdit: () => {
    const { profile } = get();
    set({ editedProfile: profile, isEditing: false });
  },
}));
