import { useEffect, useLayoutEffect, type RefObject } from "react";

/**
 * Handles mobile-specific layout side effects for the header search:
 * scroll lock, search bar positioning below the header, and
 * header background override.
 */
export function useMobileSearchLayout(
  isExpanded: boolean,
  containerRef: RefObject<HTMLElement | null>,
  mobileBarRef: RefObject<HTMLDivElement | null>
) {
  // Scroll lock (mobile only)
  useEffect(() => {
    if (isExpanded && window.matchMedia("(max-width: 639px)").matches) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  // Bar positioning + header bg
  useLayoutEffect(() => {
    if (!isExpanded || !mobileBarRef.current || !containerRef.current) return;
    const header = containerRef.current.closest("header");
    if (!header) return;
    mobileBarRef.current.style.top = `${header.getBoundingClientRect().bottom}px`;
    // TODO - find a solution that keeps the glass effect on the header
    header.classList.add("max-sm:bg-bg");
    return () => {
      header.classList.remove("max-sm:bg-bg");
    };
  }, [isExpanded, containerRef, mobileBarRef]);
}
