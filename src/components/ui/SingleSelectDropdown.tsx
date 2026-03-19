import { useState } from "react";
import { Check } from "lucide-react";

import { cn } from "@/utils/lib";
import { Dropdown } from "@/components/ui/Dropdown";

type SingleSelectDropdownProps<T extends string> = {
  label: string;
  placeholder: string;
  items: { value: T; label: string }[];
  value: T | null;
  onChange: (value: T | null) => void;
};

export function SingleSelectDropdown<T extends string>({
  label,
  placeholder,
  items,
  value,
  onChange,
}: SingleSelectDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    items.find((item) => item.value === value)?.label ?? placeholder;

  const handleSelect = (newValue: T | null) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <Dropdown
      label={label}
      displayText={selectedLabel}
      isOpen={isOpen}
      onToggle={() => setIsOpen((prev) => !prev)}
    >
      <button
        type="button"
        onClick={() => handleSelect(null)}
        className={cn(
          "flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left",
          "transition-colors hover:bg-(--accent-bg)",
          value === null && "text-(--accent)"
        )}
      >
        <Check
          className={cn("size-4", value === null ? "opacity-100" : "opacity-0")}
        />
        <span className="flex-1 text-sm">{placeholder}</span>
      </button>
      {items.map(({ value: itemValue, label: itemLabel }) => (
        <button
          key={itemValue}
          type="button"
          onClick={() => handleSelect(itemValue)}
          className={cn(
            "flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left",
            "transition-colors hover:bg-(--accent-bg)",
            value === itemValue && "text-(--accent)"
          )}
        >
          <Check
            className={cn(
              "size-4",
              value === itemValue ? "opacity-100" : "opacity-0"
            )}
          />
          <span className="flex-1 text-sm">{itemLabel}</span>
        </button>
      ))}
    </Dropdown>
  );
}
