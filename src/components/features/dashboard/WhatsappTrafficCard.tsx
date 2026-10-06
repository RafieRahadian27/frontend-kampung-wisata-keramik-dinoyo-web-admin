import { MessageSquareText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn, formatRibuan } from "@/lib/utils";
import type { DashboardData } from "@/types";

const BAR_COLORS = {
  primary: "bg-primary-container",
  secondary: "bg-secondary",
  default: "bg-surface-high",
};

/** Kartu trafik klik WhatsApp: grafik batang mingguan (CSS murni) + sebaran per gang. */
export function WhatsappTrafficCard({ whatsapp }: { whatsapp: DashboardData["whatsapp"] }) {
  const maxValue = Math.max(...whatsapp.harian.map((day) => day.nilai));

  return (
    <Card>
      <div className="flex items-start justify-between gap-3 pb-3">
        <div className="flex min-w-0 gap-2.5">
          <IconTile tone="secondary" size="sm">
            <MessageSquareText />
          </IconTile>
          <div className="min-w-0">
            <h2 className="text-xl leading-7 font-semibold text-on-surface">Trafik Kontak WhatsApp</h2>
            <p className="text-xs leading-[18px] text-on-surface-variant">Konversi klik pengunjung ke WA pengrajin</p>
          </div>
        </div>
        <Badge tone="secondary" className="px-2.5 py-1 font-bold">
          +{whatsapp.pertumbuhan}%
        </Badge>
      </div>

      <div className="flex items-end justify-between gap-3 py-2">
        <p className="font-serif text-[32px] leading-10 font-semibold text-on-surface">{formatRibuan(whatsapp.totalKlik)}</p>
        <p className="pb-2 text-[11px] font-semibold text-on-surface-variant">Klik kontak bulan ini</p>
      </div>

      <figure aria-label="Grafik klik WhatsApp per hari" className="flex flex-col gap-2 pt-2">
        <div className="flex h-24 items-end gap-3 border-b border-outline-variant/40 px-1 sm:gap-4">
          {whatsapp.harian.map((day) => (
            <div key={day.hari} className="flex h-full flex-1 items-end justify-center">
              <div
                className={cn("w-full max-w-6 rounded-t-sm transition-[height]", BAR_COLORS[day.sorot ?? "default"])}
                style={{ height: `${(day.nilai / maxValue) * 100}%` }}
                title={`${day.hari}: ${day.nilai} klik`}
              />
            </div>
          ))}
        </div>
        <figcaption className="flex gap-3 px-1 sm:gap-4">
          {whatsapp.harian.map((day) => (
            <span key={day.hari} className="flex-1 text-center text-[11px] font-semibold text-on-surface-variant">
              {day.hari}
            </span>
          ))}
        </figcaption>
      </figure>

      <ul className="mt-5 flex flex-col gap-4">
        {whatsapp.gang.map((gang) => (
          <li key={gang.nama} className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3 text-[11px] font-semibold">
              <span className="flex min-w-0 items-center gap-2 text-on-surface-variant">
                <span className={cn("size-2 shrink-0 rounded-full", gang.tone === "primary" ? "bg-primary" : "bg-secondary")} aria-hidden />
                <span className="truncate">{gang.nama}</span>
              </span>
              <span className="shrink-0 text-on-surface">{gang.klik} klik</span>
            </div>
            <ProgressBar value={gang.persen} tone={gang.tone} label={`Persentase klik ${gang.nama}`} className="h-1" />
          </li>
        ))}
      </ul>
    </Card>
  );
}
