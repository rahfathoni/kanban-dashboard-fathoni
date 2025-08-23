import { create } from "zustand"

interface IAppState {
  user: string | null;
  open: boolean;
  toggle: () => void;
  setOpen: (value: boolean) => void;
  setUser: (name: string) => void;
}

export const useStore = create<IAppState>((set) => ({
  user: null,
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
  setOpen: (value: boolean) => set({ open: value }),
  setUser: (name) => set({ user: name }),
}))