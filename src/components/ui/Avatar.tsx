import Image from "next/image";
import type { Tone } from "@/types";
import { cn } from "@/lib/utils";

const TONE_CLASSES: Record<Tone, string> = {
  primary: "bg-primary-fixed text-primary",
  secondary: "bg-secondary-container text-secondary",
  tertiary: "bg-tertiary-container text-tertiary",
  neutral: "bg-surface-high text-on-surface-variant",
  error: "bg-error-container text-error",
  solid: "bg-primary-container text-on-primary-container",
};

const SIZE_CLASSES = {
  xs: "size-6 text-[10px]",
  sm: "size-9 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};

interface AvatarProps {
  name: string;
  initials?: string;
  src?: string;
  tone?: Tone;
  size?: keyof typeof SIZE_CLASSES;
  shape?: "circle" | "rounded";
  className?: string;
}

export function Avatar({ name, initials, src, tone = "primary", size = "md", shape = "circle", className }: AvatarProps) {
  const radius = shape === "circle" ? "rounded-full" : "rounded-xl";

  if (src) {
    return (
      <span className={cn("relative inline-block shrink-0 overflow-hidden bg-surface-high", radius, SIZE_CLASSES[size], className)}>
        <Image src={src} alt={name} fill sizes="64px" className="object-cover" />
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center font-semibold", radius, TONE_CLASSES[tone], SIZE_CLASSES[size], className)}
      aria-label={name}
    >
      {initials}
    </span>
  );
}
