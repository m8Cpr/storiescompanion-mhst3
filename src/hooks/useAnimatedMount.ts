import { useState } from "react";

/**
 * Manages mount/unmount lifecycle for CSS-animated elements.
 * Keeps the element mounted while the exit animation plays,
 * then unmounts it via the returned `onAnimationEnd` handler.
 */
export function useAnimatedMount(isOpen: boolean) {
  const [mounted, setMounted] = useState(isOpen);

  if (isOpen && !mounted) {
    setMounted(true);
  }

  function onAnimationEnd() {
    if (!isOpen) setMounted(false);
  }

  return { mounted, visible: isOpen, onAnimationEnd };
}
