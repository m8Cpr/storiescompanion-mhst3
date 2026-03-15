import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

type ThemeStore = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  return theme === "system" ? getSystemTheme() : theme;
}

function applyTheme(resolved: "light" | "dark") {
  if (resolved === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "system",
      resolvedTheme: getSystemTheme(),
      setTheme: (theme) => {
        const resolved = resolveTheme(theme);
        applyTheme(resolved);
        set({ theme, resolvedTheme: resolved });
      },
      toggleTheme: () => {
        const current = get().resolvedTheme;
        const next = current === "light" ? "dark" : "light";
        applyTheme(next);
        set({ theme: next, resolvedTheme: next });
      },
    }),
    {
      name: "theme-preference",
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => {
        return (state) => {
          if (!state) return;
          const resolved = resolveTheme(state.theme);
          applyTheme(resolved);
          useThemeStore.setState({ resolvedTheme: resolved });
        };
      },
    }
  )
);

// Listen for system theme changes when in "system" mode
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    const { theme } = useThemeStore.getState();
    if (theme === "system") {
      const resolved = getSystemTheme();
      applyTheme(resolved);
      useThemeStore.setState({ resolvedTheme: resolved });
    }
  });
