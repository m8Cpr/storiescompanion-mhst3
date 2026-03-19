import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/utils/lib";

type DropdownProps = {
  label: string;
  displayText: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

export function Dropdown({
  label,
  displayText,
  isOpen,
  onToggle,
  children,
}: DropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [openAbove, setOpenAbove] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onToggle();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onToggle]);

  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setOpenAbove(spaceAbove > spaceBelow);
    }
  }, [isOpen]);

  return (
    <div ref={containerRef}>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          onClick={onToggle}
          className={cn(
            "flex w-full items-center justify-between text-left",
            "rounded-lg border border-(--border) bg-(--bg) px-3 py-2",
            "focus:outline-none focus:ring-2 focus:ring-(--accent)"
          )}
        >
          <span className="text-sm">{displayText}</span>
          <ChevronDown
            className={cn(
              "size-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div
            className={cn(
              "absolute z-50 w-full max-h-48 lg:max-h-60 overflow-y-auto",
              "rounded-lg border border-(--border) bg-(--bg) shadow-lg",
              openAbove ? "bottom-full mb-1" : "mt-1"
            )}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
