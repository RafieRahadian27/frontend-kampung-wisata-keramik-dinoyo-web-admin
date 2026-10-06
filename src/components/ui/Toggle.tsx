"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  tone?: "secondary" | "primary";
  adornment?: React.ReactNode;
}

/** Saklar on/off (switch) yang aksesibel untuk pengaturan status. */
export function Toggle({ label, description, checked, onChange, tone = "secondary", adornment }: ToggleProps) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <label htmlFor={id} className="flex items-center gap-2 text-sm font-semibold text-on-surface">
          {label}
          {adornment}
        </label>
        {description && <p className="mt-0.5 text-xs leading-[18px] text-on-surface-variant">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative mt-1 h-7 w-12 shrink-0 rounded-full transition-colors",
          checked ? (tone === "primary" ? "bg-primary" : "bg-secondary") : "bg-surface-highest",
        )}
      >
        <span
          className={cn(
            "absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform",
            checked && "translate-x-5",
          )}
        />
      </button>
    </div>
  );
}
