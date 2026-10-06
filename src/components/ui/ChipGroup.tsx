"use client";

import { cn } from "@/lib/utils";

export interface ChipOption<T extends string> {
  value: T;
  label: string;
}

interface ChipGroupProps<T extends string> {
  label: string;
  options: ChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md";
  className?: string;
}

/** Sekumpulan chip filter — hanya satu yang aktif (radio group). */
export function ChipGroup<T extends string>({ label, options, value, onChange, size = "md", className }: ChipGroupProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full font-semibold whitespace-nowrap transition",
              size === "sm" ? "px-3.5 py-1.5 text-xs" : "px-4 py-2 text-sm",
              isActive
                ? "bg-secondary text-on-secondary shadow-card"
                : "border border-outline-variant/50 bg-surface-lowest text-on-surface-variant hover:bg-surface-low",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
