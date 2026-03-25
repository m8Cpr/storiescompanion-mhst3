import { create } from "zustand";

type UIState = {
  isHomeSearchVisible: boolean;
  setHomeSearchVisible: (visible: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  isHomeSearchVisible: true,
  setHomeSearchVisible: (visible) => set({ isHomeSearchVisible: visible }),
}));
