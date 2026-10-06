import { ArrowUp, CalendarDays, Sprout, Store, UserCheck, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { IconTile, type IconTileTone } from "@/components/ui/IconTile";
import { cn } from "@/lib/utils";
import type { DashboardData } from "@/types";

interface KpiConfig {
  key: keyof DashboardData["statistik"];
  label: string;
  icon: LucideIcon;
  tone: IconTileTone;
  badgeTone: BadgeTone;
  glow: string;
  badgeIcon?: ReactNode;
  dotNote?: boolean;
}

const KPI_CONFIG: KpiConfig[] = [
  { key: "toko", label: "Toko Terdaftar", icon: Store, tone: "primary", badgeTone: "secondary", glow: "bg-primary-fixed/40", badgeIcon: <ArrowUp className="size-3" aria-hidden />, dotNote: true },
  { key: "produk", label: "Katalog Produk", icon: Sprout, tone: "secondary", badgeTone: "neutral", glow: "bg-secondary-container/50" },
  { key: "pengrajin", label: "Akun Pengrajin", icon: UserCheck, tone: "tertiary", badgeTone: "neutral", glow: "bg-tertiary-container/50" },
  { key: "reservasi", label: "Reservasi Workshop", icon: CalendarDays, tone: "neutral", badgeTone: "primary", glow: "bg-primary/10" },
];

/** Empat kartu KPI ("bento") di bawah sapaan dashboard. */
export function KpiGrid({ statistik }: { statistik: DashboardData["statistik"] }) {
  return (
    <section aria-label="Ringkasan statistik" className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
      {KPI_CONFIG.map(({ key, label, icon: Icon, tone, badgeTone, glow, badgeIcon, dotNote }) => {
        const stat = statistik[key];
        return (
          <article key={key} className="relative flex min-w-0 flex-col gap-4 overflow-hidden rounded-2xl bg-surface-lowest p-4 shadow-card sm:gap-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <IconTile tone={tone} size="lg">
                <Icon />
              </IconTile>
              <Badge tone={badgeTone} icon={badgeIcon}>
                {stat.lencana}
              </Badge>
            </div>
            <div className="relative z-10 flex flex-col gap-1">
              <p className="font-serif text-[40px] leading-[44px] font-bold tracking-[-0.025em] text-on-surface sm:text-[56px] sm:leading-[56px]">{stat.nilai}</p>
              <h2 className="pt-1 text-base leading-6 font-semibold text-on-surface sm:text-xl sm:leading-7">{label}</h2>
              <p className="hidden items-start gap-1.5 text-xs leading-[18px] text-on-surface-variant sm:flex">
                {dotNote && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-tertiary" aria-hidden />}
                {stat.catatan}
              </p>
            </div>
            <span className={cn("pointer-events-none absolute -right-6 -bottom-6 size-24 rounded-full blur-xl", glow)} aria-hidden />
          </article>
        );
      })}
    </section>
  );
}
