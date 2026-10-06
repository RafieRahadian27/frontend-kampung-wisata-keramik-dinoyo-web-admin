import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  aside?: ReactNode;
  variant?: "serif" | "sans";
  className?: string;
}

/** Judul panel: ikon opsional + judul + subjudul + elemen kanan (badge/tautan). */
export function SectionTitle({ title, description, icon, aside, variant = "serif", className }: SectionTitleProps) {
  return (
    <div className={cn("flex items-start justify-between gap-3", className)}>
      <div className="flex min-w-0 items-start gap-3">
        {icon}
        <div className="min-w-0">
          <h2
            className={cn(
              "text-on-surface",
              variant === "serif" ? "font-serif text-xl leading-7 font-semibold sm:text-2xl sm:leading-8" : "text-xl leading-7 font-semibold",
            )}
          >
            {title}
          </h2>
          {description && <p className="mt-0.5 text-xs leading-[18px] text-on-surface-variant">{description}</p>}
        </div>
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}
