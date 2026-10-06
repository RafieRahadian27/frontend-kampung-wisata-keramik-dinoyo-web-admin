"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  icon?: ReactNode;
  className?: string;
}

/** Dropdown filter bergaya "pill" dengan ikon di kiri dan chevron di kanan. */
export function FilterSelect({ label, value, options, onChange, icon, className }: FilterSelectProps) {
  return (
    <label className={cn("relative flex min-w-0 items-center", className)}>
      <span className="sr-only">{label}</span>
      {icon && <span className="pointer-events-none absolute left-4 text-on-surface-variant [&_svg]:size-4">{icon}</span>}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-11 w-full min-w-0 cursor-pointer appearance-none truncate rounded-xl border border-outline-variant/40 bg-surface-lowest pr-10 text-sm font-semibold text-on-surface outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/15",
          icon ? "pl-11" : "pl-4",
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 size-4 text-on-surface-variant" aria-hidden />
    </label>
  );
}
