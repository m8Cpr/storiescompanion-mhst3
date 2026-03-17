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
import { useFilterStore, type FilterKey } from "@/stores/filterStore";
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

  const store = useFilterStore();

  const hideElderDragons = useFilterStore((s) => s.hideElderDragons);
  const isActive = useFilterStore((s) => s.hasActiveFilters());
  const setHideElderDragons = useFilterStore((s) => s.setHideElderDragons);
  const clearFilters = useFilterStore((s) => s.clearFilters);

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
              <FilterSelect
                key={key}
                filterKey={key}
                label={t(labelKey)}
                value={store[key] ?? ""}
                onChange={(v) => store.setFilter(key, v || null)}
                options={options}
                translationMap={translationMap}
                placeholder={t(FILTER.ALL_PLACEHOLDER)}
              />
            )
          )}

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="hideElders"
              checked={hideElderDragons}
              onChange={(e) => setHideElderDragons(e.target.checked)}
              className="size-4 cursor-pointer accent-(--accent)"
            />
            <label htmlFor="hideElders" className="cursor-pointer text-sm">
              {t(FILTER.HIDE_ELDER_DRAGONS)}
            </label>
          </div>
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

type FilterSelectProps<K extends string> = {
  filterKey: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly K[];
  translationMap: Record<K, string>;
  placeholder: string;
};

function FilterSelect<K extends string>({
  filterKey,
  label,
  value,
  onChange,
  options,
  translationMap,
  placeholder,
}: FilterSelectProps<K>) {
  const { t } = useTranslation("common");
  const id = `filter-${filterKey}`;

  return (
    <>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        name={filterKey}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-lg border border-(--border) bg-(--bg) px-3 py-2",
          "focus:outline-none focus:ring-2 focus:ring-(--accent)"
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((key) => (
          <option key={key} value={key}>
            {t(translationMap[key])}
          </option>
        ))}
      </select>
    </>
  );
}
