import { create } from "zustand"

interface IGlobalState {
  open: boolean;
  toggle: () => void;
  setOpen: (value: boolean) => void;
}

export const useGlobalStore = create<IGlobalState>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
  setOpen: (value: boolean) => set({ open: value }),
}))