import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type CardProps = ComponentProps<"section"> & {
  padding?: "none" | "sm" | "md";
  tone?: "default" | "muted" | "secondary";
};

const PADDING = { none: "", sm: "p-4", md: "p-4 sm:p-6" };
const TONE = {
  default: "bg-surface-lowest shadow-card",
  muted: "bg-surface-container",
  secondary: "bg-secondary-container/50",
};

/** Kontainer putih ber-radius 16px — elemen dasar hampir semua panel di desain. */
export function Card({ padding = "md", tone = "default", className, ...props }: CardProps) {
  return <section className={cn("relative overflow-hidden rounded-2xl", TONE[tone], PADDING[padding], className)} {...props} />;
}
