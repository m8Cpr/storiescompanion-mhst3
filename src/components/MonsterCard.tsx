import { Droplet, Flame, Mountain, Snowflake, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { TRANSLATION_KEYS } from "@/i18n/keys";
import type { Monster, MonsterElement } from "@/schemas/monster";
import { cn } from "@/utils/lib";

const { MONSTER } = TRANSLATION_KEYS;

type MonsterCardProps = {
  monster: Monster;
};

const ELEMENT_ICONS: Partial<Record<MonsterElement, LucideIcon>> = {
  fire: Flame,
  water: Droplet,
  thunder: Zap,
  ice: Snowflake,
  dragon: Mountain,
};

const ELEMENT_COLORS: Record<MonsterElement, string> = {
  fire: "text-orange-500",
  water: "text-blue-500",
  thunder: "text-yellow-500",
  ice: "text-cyan-500",
  dragon: "text-purple-500",
  nonElemental: "text-(--text)",
};

const ATTACK_TYPE_COLORS: Record<string, string> = {
  power: "text-red-600 dark:text-red-400",
  speed: "text-blue-600 dark:text-blue-400",
  technical: "text-green-600 dark:text-green-400",
};

export default function MonsterCard({ monster }: MonsterCardProps) {
  const { t } = useTranslation("common");
  const baseAttack = monster.combatData.attackPatterns.DEFAULT;
  const ElementIcon = ELEMENT_ICONS[monster.element];

  return (
    <Link to={`/monster/${monster.id}`} className="group block">
      <div
        className={cn(
          "rounded-lg border border-(--border) bg-(--bg) p-5",
          "transition-all hover:bg-(--accent-bg) hover:shadow-(--shadow)"
        )}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <span>
            <h3
              className={cn(
                "font-medium text-(--text-h)",
                "transition-colors group-hover:text-(--accent)"
              )}
            >
              {monster.name}
            </h3>
            <p className="text-sm text-(--text)">
              {t(MONSTER.EGG_GROUP[monster.eggGroup])}
            </p>
          </span>

          <span
            className={cn(
              "flex items-center gap-1.5",
              ELEMENT_COLORS[monster.element]
            )}
          >
            {ElementIcon && <ElementIcon className="size-4" />}
            <p className="text-sm text-right">
              {t(MONSTER.ELEMENT[monster.element])}
            </p>
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-(--text)">
          <p
            className={cn(
              "rounded bg-(--code-bg) px-2 py-1 font-medium",
              ATTACK_TYPE_COLORS[baseAttack]
            )}
          >
            {t(MONSTER.ATTACK_TYPE[baseAttack])}
          </p>
          {monster.habitat && (
            <p className="rounded bg-(--code-bg) px-2 py-1">
              {monster.habitat}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
