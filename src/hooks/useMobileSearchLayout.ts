import { useEffect } from "react";

/**
 * Handles mobile-specific layout side effects for the header search:
 * scroll lock when the search panel is expanded.
 */
export function useMobileSearchLayout(isExpanded: boolean) {
  useEffect(() => {
    if (isExpanded && window.matchMedia("(max-width: 639px)").matches) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);
}
