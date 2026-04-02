import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { TRANSLATION_KEYS } from "@/i18n/keys";
import type { Monster, Relationship } from "@/schemas/monster";
import { useMonsterStore } from "@/stores/monsterStore";
import { cn } from "@/utils/lib";
import { logger } from "@/utils/logger";

import RelatedMonsters from "./RelatedMonsters";

type RelatedMonsterProps = {
  monster: Monster;
};

type RelationshipConfig = {
  key: Relationship;
  getData: (m: Monster) => string[] | undefined;
  groupFn: (slugs: string[]) => Monster[];
};

export default function RelatedSection({ monster }: RelatedMonsterProps) {
  const { t } = useTranslation("monster");
  const { MONSTER } = TRANSLATION_KEYS;

  const groupByFights = useMonsterStore((s) => s.groupByFights);
  const groupByMutations = useMonsterStore((s) => s.groupByMutations);

  const entries = useMemo(() => {
    const config: RelationshipConfig[] = [
      {
        key: "mutations",
        getData: (m) => m.related?.mutations,
        groupFn: groupByMutations,
      },
      {
        key: "fights",
        getData: (m) => m.related?.fights,
        groupFn: groupByFights,
      },
    ];

    return config
      .filter(({ getData }) => getData(monster)?.length)
      .map(({ key, getData, groupFn }) => ({
        key,
        monsters: groupFn(getData(monster)!),
      }));
  }, [monster, groupByFights, groupByMutations]);

  if (entries.length === 0) {
    logger.warn(`[related] - no entries for ${monster.name}`);

    return null;
  }

  logger.info(
    `[related] - found ${entries.length} ${entries.length === 1 ? "entry" : "entries"}`
  );

  return (
    <section className={cn("border-t border-border pt-3 lg:pt-6", "space-y-4")}>
      <h2 className="text-2xl font-bold">
        {t(MONSTER.DETAIL_LABEL.RELATED_MONSTERS)}
      </h2>
      {entries.map(({ key, monsters }) => (
        <RelatedMonsters key={key} relationship={key} monsters={monsters} />
      ))}
    </section>
  );
}
