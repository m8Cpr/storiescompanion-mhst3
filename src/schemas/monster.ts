import { TRANSLATION_KEYS } from "@/i18n/keys";

export type AttackType = keyof typeof TRANSLATION_KEYS.MONSTER.ATTACK_TYPE;

export type WeaponType = keyof typeof TRANSLATION_KEYS.MONSTER.WEAPON_TYPE;

export type Element = Exclude<keyof typeof TRANSLATION_KEYS.MONSTER.ELEMENT, "nonElemental">;

export type MonsterElement = keyof typeof TRANSLATION_KEYS.MONSTER.ELEMENT;

export type EggGroup = keyof typeof TRANSLATION_KEYS.MONSTER.EGG_GROUP;

export type Habitat = keyof typeof TRANSLATION_KEYS.MONSTER.HABITAT;

export type StatusEffect = keyof typeof TRANSLATION_KEYS.MONSTER.STATUS_EFFECT;

export type MonsterLocation = {
  type: string;
  main: string;
  sub?: string;
};

export type HabitatLocation = {
  habitat: Habitat;
  coordinates?: { x: number; y: number };
};

export type MonsterCombatData = {
  attackPatterns: Record<string, AttackType>;
  parts: Record<string, WeaponType[]>;
  elementalResistance: Record<MonsterElement, number>;
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
  habitats: Habitat[];
  locations: MonsterLocation[];
  rarity: number;
  eggGroup: EggGroup;
  element: MonsterElement;
  combatData: MonsterCombatData;
  hatchable?: boolean;
  monstie?: MonstieData;
};
