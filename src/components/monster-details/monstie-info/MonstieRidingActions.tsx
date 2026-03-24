import { TRANSLATION_KEYS } from "@/i18n/keys";
import type { RidingAction } from "@/schemas/monster";
import { cn } from "@/utils/lib";
import { useTranslation } from "react-i18next";

const { MONSTER } = TRANSLATION_KEYS;

interface MonstieRidingActionsProps {
  actions: RidingAction[];
}

export function MonstieRidingActions({ actions }: MonstieRidingActionsProps) {
  const { t } = useTranslation("monster");

  return (
    <section className="space-y-3">
      <h3 className="text-xs text-muted-foreground uppercase tracking-wider">
        {t(MONSTER.DETAIL_LABEL.RIDING_ACTIONS)}
      </h3>

      <ul className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <li
            key={action}
            className={cn(
              "px-3 py-1.5 rounded-lg",
              "bg-primary/10 border border-primary/20",
              "text-sm font-medium text-primary"
            )}
          >
            {t(MONSTER.RIDING_ACTION[action])}
          </li>
        ))}
      </ul>
    </section>
  );
}
