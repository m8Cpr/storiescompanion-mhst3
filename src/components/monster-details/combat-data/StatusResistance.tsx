import { TRANSLATION_KEYS } from "@/i18n/keys";
import type { StatusEffect } from "@/schemas/monster";
import { cn } from "@/utils/lib";
import { getEffectivenessStyle } from "@/utils/monster";
import { useTranslation } from "react-i18next";

const { MONSTER } = TRANSLATION_KEYS;

interface StatusResistanceProps {
  resistances: Record<StatusEffect, number | "-">;
}

export function StatusResistance({ resistances }: StatusResistanceProps) {
  const { t } = useTranslation("monster");

  return (
    <dl className="grid sm:grid-cols-2 gap-3">
      {Object.entries(resistances).map(([status, res]) => {
        const normalizedRes = res === "-" ? 0 : res;
        const style = getEffectivenessStyle(normalizedRes);

        return (
          <div
            key={status}
            className={cn(
              "flex gap-2 items-center justify-between",
              "p-2 rounded bg-muted/50 border border-border"
            )}
          >
            <dt className="text-sm font-medium">
              {t(MONSTER.STATUS_EFFECT[status as StatusEffect])}
            </dt>
            <dd
              className={cn(
                "text-xs font-bold text-right truncate",
                style.text
              )}
            >
              {t(MONSTER.RESISTANCE_LEVEL[style.labelKey])}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
