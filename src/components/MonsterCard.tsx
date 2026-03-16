import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Badge from "@/components/Badge";
import { TRANSLATION_KEYS } from "@/i18n/keys";
import type { Monster } from "@/schemas/monster";
import { cn } from "@/utils/lib";
import { ATTACK_TYPE_ICONS, ELEMENT_ICONS } from "@/utils/records";

const { MONSTER } = TRANSLATION_KEYS;

type MonsterCardProps = {
  monster: Monster;
};

export default function MonsterCard({ monster }: MonsterCardProps) {
  const { t } = useTranslation("common");
  const baseAttack = monster.combatData.attackPatterns.DEFAULT;
  const ElementIcon = ELEMENT_ICONS[monster.element];
  const AttackIcon = ATTACK_TYPE_ICONS[baseAttack];
  const patternCount = Object.keys(monster.combatData.attackPatterns).length;

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

          <span className="flex items-center gap-1.5">
            <ElementIcon className="size-5 lg:size-4" />
            <AttackIcon className="size-5 lg:size-4" />
          </span>
        </div>

        <div className="grid grid-cols-7 items-center gap-2 text-xs text-(--text)">
          <Badge className="col-span-3 lg:col-span-4">
            {t(MONSTER.ATTACK_PATTERN_COUNT, { count: patternCount })}
          </Badge>
          {monster.habitats.length > 0 && (
            <Badge
              className="col-span-2"
              count={
                monster.habitats.length > 1
                  ? monster.habitats.length - 1
                  : undefined
              }
            >
              {t(MONSTER.HABITAT[monster.habitats[0]])}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
