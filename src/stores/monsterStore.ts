import { create } from "zustand";

import monstersData from "@/assets/data/monsters.json";
import type { Monster } from "@/schemas/monster";

const allMonsters = (monstersData as unknown as Monster[]).filter(
  (m) => m.combatData.attackPatterns?.default
);

const monsterMap = new Map<number, Monster>(
  allMonsters.map((m) => [m.id, m])
);

type MonsterStore = {
  monsters: Map<number, Monster>;
  monsterList: Monster[];
  getById: (id: number) => Monster | undefined;
};

export const useMonsterStore = create<MonsterStore>(() => ({
  monsters: monsterMap,
  monsterList: [...monsterMap.values()],
  getById: (id) => monsterMap.get(id),
}));
