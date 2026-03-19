import { useTranslation } from "react-i18next";
import { cva } from "class-variance-authority";
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
import {
  useFilterStore,
  type FilterKey,
  type HideCategory,
} from "@/stores/filterStore";
import { TRANSLATION_KEYS } from "@/i18n/keys";
import { getObjectKeys, cn } from "@/utils/lib";

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

  const dialogVariants = cva("", {
    variants: {
      size: {
        sm: "max-w-[calc(100%-8rem)] md:max-w-sm",
        md: "max-w-[calc(100%-4rem)] md:max-w-md",
        lg: "max-w-[calc(100%-2rem)] md:max-w-lg",
      },
      height: {
        sm: "max-h-[50svh]",
        md: "max-h-[60svh]",
        lg: "max-h-[75svh]",
        xl: "max-h-[90svh]",
        full: "max-h-[100vh] sm:max-h-[95vh]",
      },
    },
    defaultVariants: {
      size: "md",
      height: "md",
    },
  });

  const dimensionClass = dialogVariants({ size: "md", height: "xl" });

  const store = useFilterStore();

  const hiddenCategories = useFilterStore((s) => s.hiddenCategories);
  const isActive = useFilterStore((s) => s.hasActiveFilters());
  const setHiddenCategories = useFilterStore((s) => s.setHiddenCategories);
  const clearFilters = useFilterStore((s) => s.clearFilters);

  const hideCategoryItems: { value: HideCategory; label: string }[] =
    getObjectKeys(FILTER.HIDE_CATEGORY).map((key) => ({
      value: key,
      label: t(FILTER.HIDE_CATEGORY[key]),
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

      <DialogContent className={cn(dimensionClass, "flex flex-col")}>
        <DialogHeader className="border-b border-gray-200 p-4">
          <DialogTitle>{t(FILTER.TITLE)}</DialogTitle>
          <DialogDescription>{t(FILTER.DESCRIPTION)}</DialogDescription>
        </DialogHeader>

        <section className="space-y-4 no-scrollbar overflow-y-auto py-2 px-4">
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
            label={t(FILTER.HIDE_CATEGORIES)}
            placeholder={t(FILTER.ALL_PLACEHOLDER)}
            items={hideCategoryItems}
            selectedValues={hiddenCategories}
            onChange={setHiddenCategories}
            selectedCountLabel={(count) =>
              t(FILTER.SELECTED_COUNT, { count })
            }
          />
        </section>

        <footer className="border-t border-gray-200 p-4">
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
        </footer>

      </DialogContent>
    </Dialog>
  );
}
