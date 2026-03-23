import { TRANSLATION_KEYS } from "@/i18n/keys";
import type { BossCategory } from "@/schemas/monster";
import { cn } from "@/utils/lib";
import { useTranslation } from "react-i18next";

interface BossBadgeProps {
  category: BossCategory;
}

export function BossBadge({ category }: BossBadgeProps) {
  const { t } = useTranslation("common");

  return (
    <li
      className={cn(
        "flex items-center justify-center px-3 py-1 rounded-xl",
        "border border-red-500/20 bg-red-500/10",
        "text-red-500 text-sm font-medium text-center"
      )}
    >
      {t(TRANSLATION_KEYS.MONSTER.BOSS_CATEGORY[category])}
    </li>
  );
}
