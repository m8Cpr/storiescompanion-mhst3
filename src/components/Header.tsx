import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/lib";
import { TRANSLATION_KEYS } from "@/i18n/keys";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const { t } = useTranslation("common");

  return (
    <header
      className={cn(
        "flex w-full",
        "sticky top-0 z-50",
        "border-b border-(--border) bg-(--bg)/50 backdrop-blur-sm",
        "px-16 py-4 flex items-center justify-between"
      )}
    >
      <Link
        to="/"
        className="flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <BookOpen className="size-7 text-(--text-h)" />
        <span>
          <p className="font-bold text-(--text-h)">
            {t(TRANSLATION_KEYS.COMMON.APP_TITLE)}
          </p>
          <p className="text-sm text-(--text)">
            {t(TRANSLATION_KEYS.COMMON.APP_SUBTITLE)}
          </p>
        </span>
      </Link>
      <ThemeToggle />
    </header>
  );
}
