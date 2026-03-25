import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import MonsterCard from "@/components/MonsterCard";
import { TRANSLATION_KEYS } from "@/i18n/keys";
import { useMonsterStore } from "@/stores/monsterStore";
import { cn } from "@/utils/lib";

const MAX_RESULTS = 5;

type SearchResultsDropdownProps = {
  query: string;
  onSelect: () => void;
  inline?: boolean;
};

export default function SearchResultsDropdown({
  query,
  onSelect,
  inline = false,
}: SearchResultsDropdownProps) {
  const { t } = useTranslation("common");
  const monsterList = useMonsterStore((s) => s.monsterList);

  const results = useMemo(() => {
    const q = query.toLowerCase();
    return monsterList
      .filter((m) => m.name.toLowerCase().includes(q))
      .slice(0, MAX_RESULTS);
  }, [monsterList, query]);

  return (
    <div
      className={cn(
        "max-h-96 overflow-y-auto",
        "rounded-lg border border-border bg-bg shadow-lg",
        "z-50 flex flex-col",
        inline
          ? "w-full rounded-t-none border-t-0"
          : "absolute right-0 mt-1 w-72"
      )}
    >
      {results.length > 0 ? (
        <ul className="flex flex-col" onClick={onSelect}>
          {results.map((monster) => (
            <li key={monster.id}>
              <MonsterCard monster={monster} rounded={false} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="p-4 text-sm text-text text-center">
          {t(TRANSLATION_KEYS.COMMON.NO_RESULTS)}
        </p>
      )}
    </div>
  );
}
