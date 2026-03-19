import { create } from "zustand";

import monstersData from "@/assets/data/monsters.json";
import type { Monster } from "@/schemas/monster";
import { toSlug } from "@/utils/lib";
import { logger } from "@/utils/logger";

const rawMonsters = monstersData as unknown as Monster[];

const allMonsters = rawMonsters.filter((m) => {
  const hasPatterns = !!m.combatData.attackPatterns?.default;
  if (!hasPatterns) {
    logger.warn(`Monster filtered out (no default attack pattern): ${m.name}`);
  }
  return hasPatterns;
});

const monsterMap = new Map<string, Monster>();
for (const m of allMonsters) {
  const slug = toSlug(m.name);
  if (monsterMap.has(slug)) {
    logger.warn(`Duplicate monster slug: "${slug}" (${m.name})`);
  }
  monsterMap.set(slug, m);
}

type MonsterStore = {
  monsterList: Monster[];
  getBySlug: (slug: string) => Monster | undefined;
};

export const useMonsterStore = create<MonsterStore>(() => ({
  monsterList: [...monsterMap.values()],
  getBySlug: (slug) => monsterMap.get(slug),
}));
