import { useTranslation } from "react-i18next";

import MonsterCard from "@/components/MonsterCard";
import { TRANSLATION_KEYS } from "@/i18n/keys";
import type { Monster, Relationship } from "@/schemas/monster";

type RelatedMonstersProps = {
  monsters: Monster[];
  relationship: Relationship;
};

export default function RelatedMonsters({
  monsters,
  relationship,
}: RelatedMonstersProps) {
  const { t } = useTranslation("monster");
  const { MONSTER } = TRANSLATION_KEYS;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="uppercase font-semibold">
        {t(MONSTER.RELATIONSHIP[relationship])}
      </h3>
      <div className="grid sm:grid-cols-2 gap-2">
        {monsters.map((m) => (
          <MonsterCard key={m.id} monster={m} />
        ))}
      </div>
    </div>
  );
}
