import { useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/utils/lib";
import { Dropdown } from "@/components/ui/Dropdown";

type MultiSelectDropdownProps<T extends string> = {
  label: string;
  placeholder: string;
  items: { value: T; label: string }[];
  selectedValues: T[];
  onChange: (values: T[]) => void;
  selectedCountLabel: (count: number) => string;
};

export function MultiSelectDropdown<T extends string>({
  label,
  placeholder,
  items,
  selectedValues,
  onChange,
  selectedCountLabel,
}: MultiSelectDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleValue = (value: T) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const removeValue = (value: T) => {
    onChange(selectedValues.filter((v) => v !== value));
  };

  const displayText =
    selectedValues.length === 0
      ? placeholder
      : selectedCountLabel(selectedValues.length);

  return (
    <>
      <Dropdown
        label={label}
        displayText={displayText}
        isOpen={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
      >
        {items.map(({ value, label: itemLabel }) => (
          <label
            key={value}
            className={cn(
              "flex cursor-pointer items-center gap-3 px-3 py-2.5",
              "transition-colors hover:bg-(--accent-bg)"
            )}
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(value)}
              onChange={() => toggleValue(value)}
              className="size-4 cursor-pointer accent-(--accent)"
            />
            <span className="flex-1 text-sm">{itemLabel}</span>
          </label>
        ))}
      </Dropdown>

      {selectedValues.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedValues.map((value) => {
            const itemLabel = items.find((item) => item.value === value)?.label;
            return (
              <span
                key={value}
                className="inline-flex items-center gap-1 rounded bg-(--accent-bg) px-2 py-1 text-xs"
              >
                {itemLabel}
                <button
                  type="button"
                  onClick={() => removeValue(value)}
                  className="hover:text-(--destructive)"
                >
                  <X className="size-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </>
  );
}
