import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  AttackType,
  BossCategory,
  EggGroup,
  Habitat,
  MonsterElement,
} from "@/schemas/monster";

export type FilterKey = "habitat" | "eggGroup" | "attackType" | "element";

export type HideCategory = BossCategory | "endangered";

type FilterState = {
  habitat: Habitat | null;
  eggGroup: EggGroup | null;
  attackType: AttackType | null;
  element: MonsterElement | null;
  hiddenCategories: HideCategory[];
  searchQuery: string;
};

type FilterStore = FilterState & {
  setFilter: (key: FilterKey, value: string | null) => void;
  setHiddenCategories: (values: HideCategory[]) => void;
  setSearchQuery: (value: string) => void;
  clearFilters: () => void;
  hasActiveFilters: () => boolean;
};

const defaults: FilterState = {
  habitat: null,
  eggGroup: null,
  attackType: null,
  element: null,
  hiddenCategories: [],
  searchQuery: "",
};

const initialState: FilterState = {
  ...defaults,
  habitat: "azuria",
  hiddenCategories: ["story", "invasive", "feral", "elderDragon", "endangered"],
};

export const useFilterStore = create<FilterStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setFilter: (key, value) => set({ [key]: value }),
      setHiddenCategories: (values) => set({ hiddenCategories: values }),
      setSearchQuery: (value) => set({ searchQuery: value }),
      clearFilters: () => set({ ...defaults, searchQuery: get().searchQuery }),
      hasActiveFilters: () => {
        const s = get();
        return (
          s.habitat !== null ||
          s.eggGroup !== null ||
          s.attackType !== null ||
          s.element !== null ||
          s.hiddenCategories.length > 0
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
    }
  )
);
