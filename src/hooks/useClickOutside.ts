import { useEffect, type RefObject } from "react";

/**
 * Invokes a callback when a click occurs outside the referenced element.
 * The listener is only active while `enabled` is true.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onClickOutside: () => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    }

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [ref, onClickOutside, enabled]);
}
