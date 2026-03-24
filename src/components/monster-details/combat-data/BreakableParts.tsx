import { TRANSLATION_KEYS } from "@/i18n/keys";
import type { MonsterPart, WeaponType } from "@/schemas/monster";
import { cn } from "@/utils/lib";
import {
  WEAPON_ICONS,
  WEAPON_ICONS_INEFFECTIVE,
  WEAPON_ORDER,
} from "@/utils/records";
import { useTranslation } from "react-i18next";

const { MONSTER } = TRANSLATION_KEYS;

interface BreakablePartItemProps {
  part: MonsterPart;
  weapons: WeaponType[];
}

function BreakablePartItem({ part, weapons }: BreakablePartItemProps) {
  const { t } = useTranslation("monster");

  return (
    <li
      className={cn(
        "flex items-center justify-between",
        "p-3 rounded-lg bg-muted/50 border border-border"
      )}
    >
      <p className="font-medium capitalize">{t(MONSTER.PART[part])}</p>

      <span className="flex">
        {WEAPON_ORDER.map((w) => {
          const isEffective = weapons.includes(w);
          const Icon = isEffective
            ? WEAPON_ICONS[w]
            : WEAPON_ICONS_INEFFECTIVE[w];

          return (
            <Icon
              key={w}
              className={cn("size-8", !isEffective && "opacity-75")}
              aria-label={t(MONSTER.WEAPON_TYPE[w])}
            />
          );
        })}
      </span>
    </li>
  );
}

interface BreakablePartsProps {
  parts: Record<MonsterPart, WeaponType[]>;
}

export function BreakableParts({ parts }: BreakablePartsProps) {
  return (
    <ul className="space-y-3">
      {(Object.entries(parts) as [MonsterPart, WeaponType[]][]).map(
        ([part, weapons]) => (
          <BreakablePartItem key={part} part={part} weapons={weapons} />
        )
      )}
    </ul>
  );
}
