import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { IconTile, type IconTileTone } from "./IconTile";

interface MetricCardProps {
  label: string;
  value: ReactNode;
  unit?: ReactNode;
  icon?: ReactNode;
  iconTone?: IconTileTone;
  footer?: ReactNode;
  valueClassName?: string;
  className?: string;
}

/**
 * Kartu ringkasan angka (dipakai di Kelola Toko, Produk, Akun, dan Laporan).
 * Lingkaran dekoratif di pojok kanan bawah meniru ornamen "Overlay+Blur" di Figma.
 */
export function MetricCard({ label, value, unit, icon, iconTone = "primary", footer, valueClassName, className }: MetricCardProps) {
  return (
    <article className={cn("relative flex min-w-0 flex-col gap-3 overflow-hidden rounded-2xl bg-surface-lowest p-5 shadow-card", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-2">
          <p className="text-overline text-on-surface-variant">{label}</p>
          <p className="flex flex-wrap items-baseline gap-x-2">
            <span className={cn("font-serif text-[26px] leading-9 font-bold text-on-surface", valueClassName)}>{value}</span>
            {unit && <span className="text-sm text-on-surface-variant">{unit}</span>}
          </p>
        </div>
        {icon && (
          <IconTile tone={iconTone} size="lg">
            {icon}
          </IconTile>
        )}
      </div>
      {footer && <div className="relative z-10 text-xs leading-[18px] text-on-surface-variant">{footer}</div>}
      <span className="pointer-events-none absolute -right-6 -bottom-6 size-20 rounded-full bg-surface-container/70" aria-hidden />
    </article>
  );
}
