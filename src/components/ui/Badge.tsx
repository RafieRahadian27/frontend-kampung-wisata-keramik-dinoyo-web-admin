import type { ReactNode } from "react";
import type { Tone } from "@/types";
import { cn } from "@/lib/utils";

export type BadgeTone = Tone | "error-soft" | "surface";

const TONE_CLASSES: Record<BadgeTone, string> = {
  primary: "bg-primary-fixed text-on-primary-fixed-variant",
  secondary: "bg-secondary-container text-secondary-text",
  tertiary: "bg-tertiary-container text-tertiary",
  neutral: "bg-surface-container text-on-surface-variant",
  surface: "bg-surface-high text-on-surface-variant",
  error: "bg-error-container text-error",
  "error-soft": "bg-error-container/60 text-error",
  solid: "bg-secondary text-on-secondary",
};

const DOT_CLASSES: Record<BadgeTone, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  neutral: "bg-outline",
  surface: "bg-outline",
  error: "bg-error",
  "error-soft": "bg-error",
  solid: "bg-on-secondary",
};

interface BadgeProps {
  tone?: BadgeTone;
  dot?: boolean;
  icon?: ReactNode;
  uppercase?: boolean;
  className?: string;
  children: ReactNode;
}

/** Pill kecil untuk status, kategori, dan label lokasi. */
export function Badge({ tone = "neutral", dot, icon, uppercase, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] leading-[14px] font-semibold",
        uppercase && "tracking-[0.04em] uppercase",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {dot && <span className={cn("size-1.5 shrink-0 rounded-full", DOT_CLASSES[tone])} aria-hidden />}
      {icon}
      <span className="min-w-0">{children}</span>
    </span>
  );
}
