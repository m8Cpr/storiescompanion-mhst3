import { TRANSLATION_KEYS } from "@/i18n/keys";
import type { MonsterElement } from "@/schemas/monster";
import { cn } from "@/utils/lib";
import { getEffectivenessStyle } from "@/utils/monster";
import { ELEMENT_ICONS } from "@/utils/records";
import { useTranslation } from "react-i18next";

interface WeaknessChartProps {
  resistances: Record<MonsterElement, number>;
}

export function WeaknessChart({ resistances }: WeaknessChartProps) {
  const { t } = useTranslation("monster");
  const elements = Object.entries(resistances) as [MonsterElement, number][];

  return (
    <ul className="space-y-3">
      {elements.map(([element, resistance]) => {
        const style = getEffectivenessStyle(resistance);
        const ElementIcon = ELEMENT_ICONS[element];

        return (
          <li
            key={element}
            className={cn("p-4 border rounded-lg", style.container)}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 capitalize">
                <ElementIcon className="size-5" />
                <span className="font-medium">
                  {t(TRANSLATION_KEYS.MONSTER.ELEMENT[element])}
                </span>
              </span>
              <span className={cn("text-sm font-medium", style.text)}>
                {t(TRANSLATION_KEYS.MONSTER.RESISTANCE_LEVEL[style.labelKey])}
              </span>
            </div>

            <div className="mt-2 h-2 rounded-full overflow-hidden bg-muted/30">
              <div
                className={cn(
                  "h-full",
                  "transition-all duration-300",
                  style.bar,
                  style.width
                )}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
