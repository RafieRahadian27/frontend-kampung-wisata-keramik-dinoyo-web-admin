import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = Omit<ComponentProps<"input">, "type"> & { label?: string; srOnlyLabel?: boolean };

export function Checkbox({ label, srOnlyLabel, className, ...props }: CheckboxProps) {
  return (
    <label className={cn("relative inline-flex cursor-pointer items-center gap-2 text-sm text-on-surface", className)}>
      <input
        type="checkbox"
        className="size-4 cursor-pointer rounded border-outline accent-primary"
        {...props}
      />
      {label && <span className={cn(srOnlyLabel && "sr-only")}>{label}</span>}
    </label>
  );
}
