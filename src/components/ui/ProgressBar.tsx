import type { Tone } from "@/types";
import { cn } from "@/lib/utils";

const FILL: Record<Tone, string> = {
  primary: "bg-primary-container",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  neutral: "bg-on-surface-variant",
  error: "bg-error",
  solid: "bg-primary",
};

interface ProgressBarProps {
  value: number;
  tone?: Tone;
  label: string;
  className?: string;
}

export function ProgressBar({ value, tone = "primary", label, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-high", className)}
    >
      <div className={cn("h-full rounded-full transition-[width] duration-500", FILL[tone])} style={{ width: `${clamped}%` }} />
    </div>
  );
}
