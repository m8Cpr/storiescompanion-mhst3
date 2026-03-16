import type { SvgIcon } from "@/assets/icons";
import {
  ElementDragon,
  ElementFire,
  ElementIce,
  ElementNone,
  ElementThunder,
  ElementWater,
  TypePower,
  TypeSpeed,
  TypeTechnical,
} from "@/assets/icons";
import type { AttackType, MonsterElement } from "@/schemas/monster";

export const ELEMENT_ICONS: Record<MonsterElement, SvgIcon> = {
  fire: ElementFire,
  water: ElementWater,
  thunder: ElementThunder,
  ice: ElementIce,
  dragon: ElementDragon,
  nonElemental: ElementNone,
};

export const ATTACK_TYPE_ICONS: Record<AttackType, SvgIcon> = {
  power: TypePower,
  speed: TypeSpeed,
  technical: TypeTechnical,
};

export const ELEMENT_COLORS: Record<MonsterElement, string> = {
  fire: "text-orange-500",
  water: "text-blue-500",
  thunder: "text-yellow-500",
  ice: "text-cyan-500",
  dragon: "text-purple-500",
  nonElemental: "text-(--text)",
};

export const ATTACK_TYPE_COLORS: Record<string, string> = {
  power: "text-red-600 dark:text-red-400",
  speed: "text-blue-600 dark:text-blue-400",
  technical: "text-green-600 dark:text-green-400",
};
