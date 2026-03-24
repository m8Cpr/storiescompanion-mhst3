import { TRANSLATION_KEYS } from "@/i18n/keys";
import type { MonstieStats } from "@/schemas/monster";
import { useTranslation } from "react-i18next";

const { MONSTER } = TRANSLATION_KEYS;

type MonstieStatKey = keyof typeof MONSTER.MONSTIE_STAT;

interface MonstieBaseStatsProps {
  stats: MonstieStats;
}

export function MonstieBaseStats({ stats }: MonstieBaseStatsProps) {
  const { t } = useTranslation("monster");

  return (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {t(MONSTER.DETAIL_LABEL.BASE_STATS)}
      </h3>

      <dl className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {(Object.entries(stats) as [MonstieStatKey, number][]).map(
          ([stat, val]) => (
            <div key={stat} className="text-center">
              <dd className="text-2xl font-bold text-primary mb-1">{val}</dd>

              <dt className="text-xs text-muted-foreground uppercase tracking-wide">
                {t(MONSTER.MONSTIE_STAT[stat])}
              </dt>
            </div>
          )
        )}
      </dl>
    </section>
  );
}
