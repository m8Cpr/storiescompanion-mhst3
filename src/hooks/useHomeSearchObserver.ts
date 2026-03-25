import { useEffect, type RefObject } from "react";

import { useUIStore } from "@/stores/uiStore";

export function useHomeSearchObserver(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        useUIStore.getState().setHomeSearchVisible(entry.isIntersecting);
      },
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      useUIStore.getState().setHomeSearchVisible(true);
    };
  }, [ref]);
}
