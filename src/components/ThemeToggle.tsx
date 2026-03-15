import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";

export default function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg border border-(--border) bg-(--bg) p-2 transition-colors hover:bg-(--accent-bg)"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "light" ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}
    </button>
  );
}
