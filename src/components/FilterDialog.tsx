import { useTranslation } from "react-i18next";
import { Filter, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SingleSelectDropdown } from "@/components/ui/SingleSelectDropdown";
import { MultiSelectDropdown } from "@/components/ui/MultiSelectDropdown";
import { useFilterStore, type FilterKey } from "@/stores/filterStore";
import { TRANSLATION_KEYS } from "@/i18n/keys";
import { getObjectKeys, cn } from "@/utils/lib";
import type { BossCategory } from "@/schemas/monster";

const { MONSTER, FILTER } = TRANSLATION_KEYS;

type FilterSelectConfig = {
  key: FilterKey;
  labelKey: string;
  options: readonly string[];
  translationMap: Record<string, string>;
};

const filterSelectConfigs: FilterSelectConfig[] = [
  {
    key: "habitat",
    labelKey: FILTER.HABITAT,
    options: getObjectKeys(MONSTER.HABITAT),
    translationMap: MONSTER.HABITAT,
  },
  {
    key: "element",
    labelKey: FILTER.ELEMENT,
    options: getObjectKeys(MONSTER.ELEMENT),
    translationMap: MONSTER.ELEMENT,
  },
  {
    key: "attackType",
    labelKey: FILTER.ATTACK_TYPE,
    options: getObjectKeys(MONSTER.ATTACK_TYPE),
    translationMap: MONSTER.ATTACK_TYPE,
  },
  {
    key: "eggGroup",
    labelKey: FILTER.EGG_GROUP,
    options: getObjectKeys(MONSTER.EGG_GROUP),
    translationMap: MONSTER.EGG_GROUP,
  },
];

export default function FilterDialog() {
  const { t } = useTranslation("common");

  const store = useFilterStore();

  const hiddenBossCategories = useFilterStore((s) => s.hiddenBossCategories);
  const isActive = useFilterStore((s) => s.hasActiveFilters());
  const setHiddenBossCategories = useFilterStore(
    (s) => s.setHiddenBossCategories
  );
  const clearFilters = useFilterStore((s) => s.clearFilters);

  const bossItems: { value: BossCategory; label: string }[] = getObjectKeys(
    MONSTER.BOSS_CATEGORY
  ).map((key) => ({
    value: key,
    label: t(MONSTER.BOSS_CATEGORY[key]),
  }));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "relative",
            "rounded-lg border border-(--border) bg-(--bg) p-2",
            "transition-colors hover:bg-(--accent-bg)"
          )}
          aria-label={t(FILTER.TITLE)}
        >
          <Filter className="size-5" />
          {isActive && (
            <span
              className={cn(
                "absolute -top-1 -right-1",
                "size-2 rounded-full bg-(--accent)"
              )}
            />
          )}
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t(FILTER.TITLE)}</DialogTitle>
          <DialogDescription>{t(FILTER.DESCRIPTION)}</DialogDescription>
        </DialogHeader>

        <section className="space-y-4 py-2">
          {filterSelectConfigs.map(
            ({ key, labelKey, options, translationMap }) => (
              <SingleSelectDropdown
                key={key}
                label={t(labelKey)}
                value={store[key]}
                onChange={(v) => store.setFilter(key, v)}
                items={options.map((opt) => ({
                  value: opt,
                  label: t(translationMap[opt]),
                }))}
                placeholder={t(FILTER.ALL_PLACEHOLDER)}
              />
            )
          )}

          <MultiSelectDropdown
            label={t(FILTER.HIDE_BOSSES)}
            placeholder={t(FILTER.ALL_PLACEHOLDER)}
            items={bossItems}
            selectedValues={hiddenBossCategories}
            onChange={setHiddenBossCategories}
            selectedCountLabel={(count) =>
              t(FILTER.SELECTED_COUNT, { count })
            }
          />
        </section>

        <button
          type="button"
          onClick={clearFilters}
          className={cn(
            "flex items-center gap-2 self-start ml-auto",
            "rounded-lg border border-(--border) px-3 py-1.5 text-sm",
            "transition-colors hover:bg-(--accent-bg)"
          )}
        >
          <X className="size-4" />
          <p>{t(FILTER.CLEAR_ALL)}</p>
        </button>
      </DialogContent>
    </Dialog>
  );
}
