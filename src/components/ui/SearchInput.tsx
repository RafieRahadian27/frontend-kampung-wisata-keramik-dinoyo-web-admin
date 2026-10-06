"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label?: string;
  className?: string;
}

export function SearchInput({ value, onChange, placeholder, label = "Cari", className }: SearchInputProps) {
  return (
    <label className={cn("relative flex min-w-0 items-center", className)}>
      <span className="sr-only">{label}</span>
      <Search className="pointer-events-none absolute left-4 size-[18px] text-on-surface-variant" aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full min-w-0 rounded-xl border border-outline-variant/40 bg-surface-lowest pr-4 pl-11 text-sm text-on-surface outline-none placeholder:text-on-surface-variant/70 focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
      />
    </label>
  );
}
