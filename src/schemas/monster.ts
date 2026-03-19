import { TRANSLATION_KEYS } from "@/i18n/keys";

export type AttackType = keyof typeof TRANSLATION_KEYS.MONSTER.ATTACK_TYPE;

export type WeaponType = keyof typeof TRANSLATION_KEYS.MONSTER.WEAPON_TYPE;

export type Element = Exclude<
  keyof typeof TRANSLATION_KEYS.MONSTER.ELEMENT,
  "nonElemental"
>;

export type MonsterElement = keyof typeof TRANSLATION_KEYS.MONSTER.ELEMENT;

export type EggGroup = keyof typeof TRANSLATION_KEYS.MONSTER.EGG_GROUP;

export type Habitat = keyof typeof TRANSLATION_KEYS.MONSTER.HABITAT;

export type StatusEffect = keyof typeof TRANSLATION_KEYS.MONSTER.STATUS_EFFECT;

export type RidingAction = keyof typeof TRANSLATION_KEYS.MONSTER.RIDING_ACTION;

export type MonsterTrait = keyof typeof TRANSLATION_KEYS.MONSTER.TRAIT;

export type HabitatDetail = {
  area: string;
  region: string;
};

export type BossCategory = keyof typeof TRANSLATION_KEYS.MONSTER.BOSS_CATEGORY;

export type BossTurn = {
  turn: number;
  move: string;
  type: AttackType;
};

export type BossPattern = {
  state: string;
  turns: BossTurn[];
};

export type MonsterRelated = {
  fights?: number[];
  mutation?: number;
  mutations?: number[];
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
  rarity: number;
  eggGroup: EggGroup;
  element: MonsterElement;
  combatData: MonsterCombatData;
  monstie?: MonstieData;
  description?: string;
  ridingActions?: RidingAction[];
  trait?: MonsterTrait;
  howToGet?: string;
  habitatDetails?: HabitatDetail[];
  boss?: BossCategory[];
  bossPatterns?: BossPattern[];
  related?: MonsterRelated;
};
