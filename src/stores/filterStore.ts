import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  AttackType,
  EggGroup,
  Habitat,
  MonsterElement,
} from "@/schemas/monster";

export type FilterKey = "habitat" | "eggGroup" | "attackType" | "element";

type FilterState = {
  habitat: Habitat | null;
  eggGroup: EggGroup | null;
  attackType: AttackType | null;
  element: MonsterElement | null;
  hideElderDragons: boolean;
  searchQuery: string;
};

type FilterStore = FilterState & {
  setFilter: (key: FilterKey, value: string | null) => void;
  setHideElderDragons: (value: boolean) => void;
  setSearchQuery: (value: string) => void;
  clearFilters: () => void;
  hasActiveFilters: () => boolean;
};

const defaults: FilterState = {
  habitat: null,
  eggGroup: null,
  attackType: null,
  element: null,
  hideElderDragons: false,
  searchQuery: "",
};

const initialState: FilterState = {
  ...defaults,
  habitat: "azuria",
  hideElderDragons: true,
};

export const useFilterStore = create<FilterStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setFilter: (key, value) => set({ [key]: value }),
      setHideElderDragons: (value) => set({ hideElderDragons: value }),
      setSearchQuery: (value) => set({ searchQuery: value }),
      clearFilters: () => set({ ...defaults, searchQuery: get().searchQuery }),
      hasActiveFilters: () => {
        const s = get();
        return (
          s.habitat !== null ||
          s.eggGroup !== null ||
          s.attackType !== null ||
          s.element !== null ||
          s.hideElderDragons !== defaults.hideElderDragons
        );
      },
    }),
    {
      name: "monster-filters",
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    },
  ),
);
