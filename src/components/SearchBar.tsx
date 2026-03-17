import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";

import { TRANSLATION_KEYS } from "@/i18n/keys";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useFilterStore } from "@/stores/filterStore";
import { cn } from "@/utils/lib";

export default function SearchBar() {
  const { t } = useTranslation("common");
  const setSearchQuery = useFilterStore((s) => s.setSearchQuery);
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebouncedValue(inputValue, 300);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  return (
    <>
      <label htmlFor="monster-search" className="sr-only">
        {t(TRANSLATION_KEYS.COMMON.SEARCH_PLACEHOLDER)}
      </label>
      <Search
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2",
          "size-5 text-(--text)"
        )}
      />
      <input
        id="monster-search"
        name="monster-search"
        type="search"
        placeholder={t(TRANSLATION_KEYS.COMMON.SEARCH_PLACEHOLDER)}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={cn(
          "w-full pl-11 pr-10 py-3",
          "border border-(--border) rounded-lg bg-(--bg)",
          "appearance-none [&::-webkit-search-cancel-button]:appearance-none",
          "focus:outline-none focus:ring-2 focus:ring-(--accent-border)"
        )}
      />
      {inputValue && (
        <button
          type="button"
          onClick={() => setInputValue("")}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            "size-5 text-(--text) cursor-pointer"
          )}
        >
          <X className="size-5" />
        </button>
      )}
    </>
  );
}
