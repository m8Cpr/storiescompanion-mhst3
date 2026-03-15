export type AttackType = "power" | "speed" | "technical";

export type WeaponType = "slash" | "blunt" | "pierce";

export type Element = "fire" | "water" | "ice" | "thunder" | "dragon";

export type MonsterElement = Element | "non-elemental";

export type StatusEffect = "poison" | "paralysis" | "sleep" | "blast";

export type MonsterLocation = {
  type: string;
  main: string;
  sub?: string;
};

export type MonsterCombatData = {
  attackPatterns: Record<string, AttackType>;
  parts: Record<string, WeaponType[]>;
  elementalResistance: Record<Element, number>;
  statusResistance: Record<StatusEffect, number | "-">;
};

export type MonstieStats = {
  hp: number;
  attack: number;
  defense: number;
  critRate: number;
  recovery: number;
  speed: number;
  initialRes: number;
};

export type MonstieData = {
  attackType: AttackType;
  growth: string;
  kinshipSkill: string;
  eggColors: string[];
  stats: MonstieStats;
};

export type Monster = {
  id: number;
  name: string;
  habitat: string;
  locations: MonsterLocation[];
  rarity: number;
  eggGroup: string;
  element: MonsterElement;
  combatData: MonsterCombatData;
  hatchable?: boolean;
  monstie?: MonstieData;
};
