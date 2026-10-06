import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type IconTileTone = "primary" | "secondary" | "tertiary" | "neutral" | "solid-primary" | "solid-secondary" | "solid-tertiary";

const TONE_CLASSES: Record<IconTileTone, string> = {
  primary: "bg-primary-fixed text-primary",
  secondary: "bg-secondary-container text-secondary",
  tertiary: "bg-tertiary-container text-tertiary",
  neutral: "bg-surface-highest text-on-surface-variant",
  "solid-primary": "bg-primary-container text-on-primary-container",
  "solid-secondary": "bg-secondary text-on-secondary",
  "solid-tertiary": "bg-tertiary text-white",
};

const SIZE_CLASSES = {
  sm: "size-8 rounded-lg [&_svg]:size-4",
  md: "size-10 rounded-xl [&_svg]:size-5",
  lg: "size-12 rounded-xl [&_svg]:size-[22px]",
};

interface IconTileProps {
  tone?: IconTileTone;
  size?: keyof typeof SIZE_CLASSES;
  rounded?: "default" | "full";
  className?: string;
  children: ReactNode;
}

/** Kotak ikon berwarna lembut (ikon KPI, ikon judul seksi). */
export function IconTile({ tone = "primary", size = "md", rounded = "default", className, children }: IconTileProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        TONE_CLASSES[tone],
        SIZE_CLASSES[size],
        rounded === "full" && "rounded-full",
        className,
      )}
      aria-hidden
    >
      {children}
    </span>
  );
}
