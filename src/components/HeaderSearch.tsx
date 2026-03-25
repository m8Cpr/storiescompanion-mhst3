import { Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import SearchResultsDropdown from "@/components/SearchResultsDropdown";
import { useAnimatedMount } from "@/hooks/useAnimatedMount";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useMobileSearchLayout } from "@/hooks/useMobileSearchLayout";
import { TRANSLATION_KEYS } from "@/i18n/keys";
import { useUIStore } from "@/stores/uiStore";
import { cn } from "@/utils/lib";

const DEBOUNCE_MS = 300;

type SearchInputProps = {
  ref: React.Ref<HTMLInputElement>;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder: string;
  clearLabel: string;
  iconPadding?: string;
};

function SearchInput({
  ref,
  value,
  onChange,
  onClear,
  placeholder,
  clearLabel,
  iconPadding = "p-2",
}: SearchInputProps) {
  return (
    <>
      <span className={cn("shrink-0", iconPadding)}>
        <Search className="size-5" />
      </span>
      <input
        ref={ref}
        type="search"
        name="header-search"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "min-w-0 flex-1 bg-transparent py-2 pr-2",
          "text-sm outline-none",
          "appearance-none [&::-webkit-search-cancel-button]:appearance-none"
        )}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label={clearLabel}
          className={cn(
            "shrink-0 transition-colors hover:bg-accent-bg",
            iconPadding
          )}
        >
          <X className="size-4" />
        </button>
      )}
    </>
  );
}

export default function HeaderSearch() {
  const { t } = useTranslation("common");
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const isHomeSearchVisible = useUIStore((s) => s.isHomeSearchVisible);

  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const debouncedQuery = useDebouncedValue(inputValue, DEBOUNCE_MS);

  const containerRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const mobileBarRef = useRef<HTMLDivElement>(null);
  const backdropRoot = document.getElementById("main");

  const shouldRender = isHomePage ? !isHomeSearchVisible : true;
  const visibility = useAnimatedMount(shouldRender);
  const showDropdown = isExpanded && !!debouncedQuery;

  const collapse = useCallback(() => {
    setIsExpanded(false);
    setInputValue("");
  }, []);

  const backdrop = useAnimatedMount(isExpanded);
  useClickOutside(containerRef, collapse, isExpanded);
  useMobileSearchLayout(isExpanded, containerRef, mobileBarRef);

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
      mobileInputRef.current?.focus();
    }
  }, [isExpanded]);

  if (!shouldRender && isExpanded) collapse();

  const placeholder = t(TRANSLATION_KEYS.COMMON.SEARCH_PLACEHOLDER);
  const clearLabel = t(TRANSLATION_KEYS.COMMON.CLEAR_SEARCH);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") collapse();
  }

  return (
    <search
      ref={containerRef}
      className={cn(
        "relative",
        visibility.visible
          ? "animate-in fade-in-0 zoom-in-95"
          : "animate-out fade-out-0 zoom-out-95 fill-mode-forwards",
        "duration-200"
      )}
      onKeyDown={handleKeyDown}
      onAnimationEnd={visibility.onAnimationEnd}
    >
      {/* Collapsed button */}
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        className="rounded-lg border border-border bg-bg p-2 transition-colors hover:bg-accent-bg"
        aria-label={t(TRANSLATION_KEYS.COMMON.SEARCH_BUTTON)}
        aria-expanded={isExpanded}
      >
        <Search className="size-5" />
      </button>

      {/* Desktop expanded - hidden on mobile */}
      <div
        className={cn(
          "max-sm:hidden",
          "absolute right-0 top-0 z-10",
          "flex items-center overflow-hidden",
          "rounded-lg border bg-bg",
          "transition-[width,border-color,opacity] duration-300",
          isExpanded
            ? "w-72 border-border opacity-100"
            : "w-0 border-transparent opacity-0 pointer-events-none"
        )}
      >
        <SearchInput
          ref={inputRef}
          value={inputValue}
          onChange={setInputValue}
          onClear={collapse}
          placeholder={placeholder}
          clearLabel={clearLabel}
        />
      </div>

      {/* Desktop dropdown */}
      {showDropdown && (
        <div className="max-sm:hidden">
          <SearchResultsDropdown query={debouncedQuery} onSelect={collapse} />
        </div>
      )}

      {/* Mobile expanded - fixed panel below header */}
      {isExpanded && (
        <div
          ref={mobileBarRef}
          className="sm:hidden fixed left-0 z-50 w-full px-4 pt-2"
        >
          <div
            className={cn(
              "flex items-center",
              "border border-border bg-bg shadow-lg",
              showDropdown ? "rounded-t-lg" : "rounded-lg"
            )}
          >
            <SearchInput
              ref={mobileInputRef}
              value={inputValue}
              onChange={setInputValue}
              onClear={collapse}
              placeholder={placeholder}
              clearLabel={clearLabel}
              iconPadding="p-3"
            />
          </div>

          {showDropdown && (
            <SearchResultsDropdown
              query={debouncedQuery}
              onSelect={collapse}
              inline
            />
          )}
        </div>
      )}

      {/* Animated backdrop */}
      {backdrop.mounted &&
        backdropRoot &&
        createPortal(
          <div
            className={cn(
              "sm:hidden absolute inset-0 z-30 bg-black/30",
              backdrop.visible
                ? "animate-in fade-in-0"
                : "animate-out fade-out-0",
              "duration-300 fill-mode-forwards"
            )}
            onClick={collapse}
            onAnimationEnd={backdrop.onAnimationEnd}
          />,
          backdropRoot
        )}
    </search>
  );
}
