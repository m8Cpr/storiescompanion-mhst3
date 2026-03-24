import { TRANSLATION_KEYS } from "@/i18n/keys";
import type { AttackType } from "@/schemas/monster";
import { cn } from "@/utils/lib";
import { ATTACK_TYPE_COLORS, ATTACK_TYPE_ICONS } from "@/utils/records";
import { useTranslation } from "react-i18next";

const { MONSTER } = TRANSLATION_KEYS;

interface MonstieKeyInfoProps {
  attackType: AttackType;
  growth: string;
  kinshipSkill: string;
}

export function MonstieKeyInfo({
  attackType,
  growth,
  kinshipSkill,
}: MonstieKeyInfoProps) {
  const { t } = useTranslation("monster");
  const AttackIcon = ATTACK_TYPE_ICONS[attackType];

  return (
    <dl className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div>
        <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {t(MONSTER.DETAIL_LABEL.ATTACK_TYPE)}
        </dt>

        <dd className="flex items-center gap-1.5 text-lg font-bold capitalize">
          <AttackIcon
            className={cn("size-5", ATTACK_TYPE_COLORS[attackType])}
          />
          {t(MONSTER.ATTACK_TYPE[attackType])}
        </dd>
      </div>

      <div>
        <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {t(MONSTER.DETAIL_LABEL.GROWTH)}
        </dt>

        <dd className="text-lg font-bold capitalize">
          {growth.length ? growth : "-"}
        </dd>
      </div>

      <div className="col-span-2 md:col-span-1">
        <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {t(MONSTER.DETAIL_LABEL.KINSHIP_SKILL)}
        </dt>

        <dd className="text-lg font-bold">{kinshipSkill}</dd>
      </div>
    </dl>
  );
}
