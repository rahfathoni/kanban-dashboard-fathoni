import { create } from "zustand"

type Toast = {
  id: string
  message: string
  type?: "success" | "error"
}

interface IGlobalState {
  open: boolean
  toggle: () => void
  setOpen: (value: boolean) => void
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

export const useGlobalStore = create<IGlobalState>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
  setOpen: (value: boolean) => set({ open: value }),
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { ...toast, id: Date.now().toString() },
      ],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))