import { TRANSLATION_KEYS } from "@/i18n/keys";
import type { AttackType } from "@/schemas/monster";
import { cn } from "@/utils/lib";
import { ATTACK_TYPE_COLORS, ATTACK_TYPE_ICONS } from "@/utils/records";
import { useTranslation } from "react-i18next";

interface H2HPatternProps {
  patterns: Record<string, AttackType>;
}

const ATTACK_BADGE_BG: Record<AttackType, string> = {
  power: "bg-red-500/10 border-red-500/30",
  speed: "bg-blue-500/10 border-blue-500/30",
  technical: "bg-green-500/10 border-green-500/30",
};

function getCounterAttackKey(attack: string): AttackType | null {
  switch (attack.toLowerCase()) {
    case "power":
      return "speed";
    case "speed":
      return "technical";
    case "tech":
    case "technical":
      return "power";
    default:
      return null;
  }
}

interface AttackPatternItemProps {
  state: string;
  attack: AttackType;
}

function AttackPatternItem({ state, attack }: AttackPatternItemProps) {
  const { t } = useTranslation("monster");

  const ATTACK_PATTERN_STATE = TRANSLATION_KEYS.MONSTER.ATTACK_PATTERN_STATE;

  const stateKey = state as keyof typeof ATTACK_PATTERN_STATE;
  const translatedState =
    stateKey in ATTACK_PATTERN_STATE
      ? t(ATTACK_PATTERN_STATE[stateKey])
      : state;

  const AttackIcon = ATTACK_TYPE_ICONS[attack];
  const counterKey = getCounterAttackKey(attack);

  return (
    <li
      className={cn(
        "grid grid-cols-subgrid col-span-full items-center gap-4",
        "max-lg:grid-cols-1 max-lg:col-span-1",
        "p-3 border border-border rounded-lg bg-card"
      )}
    >
      <dl className="min-w-0 self-start">
        <dt className="text-sm text-muted-foreground">
          {t(TRANSLATION_KEYS.MONSTER.DETAIL_LABEL.STATE)}
        </dt>
        <dd className="font-bold truncate">{translatedState}</dd>
      </dl>

      <div className="flex items-center gap-4 max-sm:w-full">
        <span
          className={cn(
            "flex flex-1 justify-center items-center gap-2",
            "px-3 py-2 rounded border",
            ATTACK_BADGE_BG[attack],
            ATTACK_TYPE_COLORS[attack]
          )}
        >
          <AttackIcon className="size-5" />

          <span className="font-medium">
            {t(TRANSLATION_KEYS.MONSTER.ATTACK_TYPE[attack as AttackType])}
          </span>
        </span>
      </div>

      <p className="shrink-0 text-sm text-muted-foreground">
        {t(TRANSLATION_KEYS.MONSTER.DETAIL_LABEL.COUNTER)}{" "}
        <span className="font-medium text-foreground">
          {counterKey
            ? t(TRANSLATION_KEYS.MONSTER.ATTACK_TYPE[counterKey])
            : ""}
        </span>
      </p>
    </li>
  );
}

export function H2HPattern({ patterns }: H2HPatternProps) {
  const { t } = useTranslation("monster");
  const patternEntries = Object.entries(patterns);

  return (
    <div className="space-y-4">
      <ul className="flex items-center gap-4 text-sm text-muted-foreground">
        {(["power", "speed", "technical"] as const).map((type) => {
          const Icon = ATTACK_TYPE_ICONS[type];

          return (
            <li key={type} className="flex items-center gap-2">
              <Icon className={cn("size-4", ATTACK_TYPE_COLORS[type])} />

              <span>{t(TRANSLATION_KEYS.MONSTER.ATTACK_TYPE[type])}</span>
            </li>
          );
        })}
      </ul>

      <ul className="grid lg:grid-cols-[auto_1fr_auto] gap-3">
        {patternEntries.map(([state, attack]) => (
          <AttackPatternItem key={state} state={state} attack={attack} />
        ))}
      </ul>
    </div>
  );
}
