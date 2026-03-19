import { useMemo } from "react";

import { useMonsterStore } from "@/stores/monsterStore";
import { useFilterStore } from "@/stores/filterStore";
import type { BossCategory } from "@/schemas/monster";

export function useFilteredMonsters() {
  const monsterList = useMonsterStore((s) => s.monsterList);

  const habitat = useFilterStore((s) => s.habitat);
  const eggGroup = useFilterStore((s) => s.eggGroup);
  const attackType = useFilterStore((s) => s.attackType);
  const element = useFilterStore((s) => s.element);
  const hiddenCategories = useFilterStore((s) => s.hiddenCategories);
  const searchQuery = useFilterStore((s) => s.searchQuery);

  return useMemo(() => {
    const query = searchQuery.toLowerCase();
    const hiddenBoss = hiddenCategories.filter(
      (c): c is BossCategory => c !== "endangered"
    );
    const hideEndangered = hiddenCategories.includes("endangered");

    return monsterList.filter((monster) => {
      if (query && !monster.name.toLowerCase().includes(query)) return false;
      if (habitat && !monster.habitats.includes(habitat)) return false;
      if (eggGroup && monster.eggGroup !== eggGroup) return false;
      if (attackType && monster.monstie?.attackType !== attackType)
        return false;
      if (element && monster.element !== element) return false;
      if (
        hiddenBoss.length > 0 &&
        monster.boss?.some((b) => hiddenBoss.includes(b))
      )
        return false;
      if (hideEndangered && monster.trait === "endangered") return false;
      return true;
    });
  }, [monsterList, searchQuery, habitat, eggGroup, attackType, element, hiddenCategories]);
}
