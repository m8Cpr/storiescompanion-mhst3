import { useMemo } from "react";

import { useMonsterStore } from "@/stores/monsterStore";
import { useFilterStore } from "@/stores/filterStore";

export function useFilteredMonsters() {
  const monsterList = useMonsterStore((s) => s.monsterList);
  
  const habitat = useFilterStore((s) => s.habitat);
  const eggGroup = useFilterStore((s) => s.eggGroup);
  const attackType = useFilterStore((s) => s.attackType);
  const element = useFilterStore((s) => s.element);
  const hideElderDragons = useFilterStore((s) => s.hideElderDragons);

  return useMemo(() => {
    return monsterList.filter((monster) => {
      if (habitat && !monster.habitats.includes(habitat)) return false;
      if (eggGroup && monster.eggGroup !== eggGroup) return false;
      if (
        attackType &&
        monster.combatData.attackPatterns.DEFAULT !== attackType
      )
        return false;
      if (element && monster.element !== element) return false;
      if (hideElderDragons && monster.eggGroup === "elderDragon") return false;
      return true;
    });
  }, [monsterList, habitat, eggGroup, attackType, element, hideElderDragons]);
}
