import { TRANSLATION_KEYS } from "@/i18n/keys";

export type ResistanceLevelKey =
  keyof typeof TRANSLATION_KEYS.MONSTER.RESISTANCE_LEVEL;

export function getEffectivenessStyle(resistance: number) {
  switch (true) {
    case resistance < -1:
      return {
        labelKey: "veryWeak" as ResistanceLevelKey,
        container: "bg-green-500/10 border-green-500/30",
        text: "text-green-600 dark:text-green-400",
        bar: "bg-green-500",
        width: "w-full",
      };
    case resistance === -1:
      return {
        labelKey: "weak" as ResistanceLevelKey,
        container: "bg-green-500/10 border-green-500/30",
        text: "text-green-600 dark:text-green-400",
        bar: "bg-green-500",
        width: "w-3/4",
      };
    case resistance === 0:
      return {
        labelKey: "normal" as ResistanceLevelKey,
        container: "bg-muted/50 border-border",
        text: "text-muted-foreground",
        bar: "bg-muted-foreground",
        width: "w-1/2",
      };
    case resistance === 1:
      return {
        labelKey: "resistant" as ResistanceLevelKey,
        container: "bg-orange-500/10 border-orange-500/30",
        text: "text-orange-600 dark:text-orange-400",
        bar: "bg-orange-500",
        width: "w-2/5",
      };
    default:
      return {
        labelKey: "veryResistant" as ResistanceLevelKey,
        container: "bg-red-500/10 border-red-500/30",
        text: "text-red-600 dark:text-red-400",
        bar: "bg-red-500",
        width: "w-1/6",
      };
  }
}
