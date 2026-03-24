import { BreakableParts } from "@/components/monster-details/combat-data/BreakableParts";
import { DetailArticle } from "@/components/monster-details/DetailArticle";
import { H2HPattern } from "@/components/monster-details/combat-data/H2HPattern";
import { StatusResistance } from "@/components/monster-details/combat-data/StatusResistance";
import { WeaknessChart } from "@/components/monster-details/combat-data/WeaknessChart";
import { TRANSLATION_KEYS } from "@/i18n/keys";
import type { MonsterCombatData } from "@/schemas/monster";
import { Shield, Sword, Target, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const { MONSTER } = TRANSLATION_KEYS;

interface CombatDataProps {
  combatData: MonsterCombatData;
}

export function CombatData({ combatData }: CombatDataProps) {
  const { t } = useTranslation("monster");

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <DetailArticle
          icon={Sword}
          title={t(MONSTER.DETAIL_LABEL.ATTACK_PATTERNS)}
          description={t(MONSTER.DETAIL_LABEL.ATTACK_PATTERNS_DESC)}
          variant="plain"
        >
          <H2HPattern patterns={combatData.attackPatterns} />
        </DetailArticle>

        <DetailArticle
          icon={Target}
          title={t(MONSTER.DETAIL_LABEL.BREAKABLE_PARTS)}
        >
          {combatData.parts.isEmpty() ? (
            <p>
              {t(TRANSLATION_KEYS.COMMON.DATA_NOT_AVAILABLE, { ns: "common" })}
            </p>
          ) : (
            <BreakableParts parts={combatData.parts} />
          )}
        </DetailArticle>
      </div>

      <div className="space-y-6">
        <DetailArticle
          icon={Shield}
          title={t(MONSTER.DETAIL_LABEL.ELEMENTAL_WEAKNESSES)}
          description={t(MONSTER.DETAIL_LABEL.ELEMENTAL_WEAKNESSES_DESC)}
          variant="plain"
          className="flex flex-col gap-2"
        >
          <WeaknessChart resistances={combatData.elementalResistance} />
        </DetailArticle>

        <DetailArticle
          icon={Zap}
          title={t(MONSTER.DETAIL_LABEL.STATUS_RESISTANCE)}
        >
          <StatusResistance resistances={combatData.statusResistance} />
        </DetailArticle>
      </div>
    </section>
  );
}
