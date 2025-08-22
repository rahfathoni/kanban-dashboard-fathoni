import { create } from "zustand";

interface AppState {
  user: string | null;
  setUser: (name: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (name) => set({ user: name }),
}));