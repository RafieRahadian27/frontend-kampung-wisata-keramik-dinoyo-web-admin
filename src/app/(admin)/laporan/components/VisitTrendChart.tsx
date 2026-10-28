import { ChartColumn, Info } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";
import type { LaporanData } from "@/types";

const SERIES = [
  { key: "sekolah", label: "Rombongan Edukasi Sekolah", className: "bg-primary" },
  { key: "mandiri", label: "Keluarga & Turis Mandiri", className: "bg-secondary" },
] as const;

/** Grafik batang berkelompok yang dibangun dengan flexbox (tinggi batang = persentase). */
export function VisitTrendChart({ tren }: { tren: LaporanData["tren"] }) {
  const maxValue = Math.max(...tren.flatMap((week) => [week.sekolah, week.mandiri]));

  return (
    <Card>
      <SectionTitle
        variant="sans"
        icon={<ChartColumn className="mt-1 size-5 shrink-0 text-primary" aria-hidden />}
        title="Tren Arus Kunjungan Wisatawan"
        description="Komparasi kunjungan rombongan edukasi sekolah vs keluarga/mandiri bulan Oktober 2024"
      />

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2" aria-label="Legenda grafik">
        {SERIES.map((series) => (
          <li key={series.key} className="flex items-center gap-2 text-xs font-semibold text-on-surface">
            <span className={cn("size-3 rounded-sm", series.className)} aria-hidden />
            {series.label}
          </li>
        ))}
      </ul>

      <figure className="mt-6 rounded-2xl bg-surface-low p-4 sm:p-6">
        <div className="scrollbar-thin relative overflow-x-auto">
          <div className="flex h-64 min-w-[420px] items-end justify-between gap-3 border-b border-outline-variant/50 pt-8 sm:h-72" role="img" aria-label="Grafik tren kunjungan per minggu">
            {tren.map((week) => (
              <div key={week.label} className="flex h-full flex-1 flex-col items-center justify-end">
                <div className={cn("relative flex h-full w-full max-w-[96px] items-end justify-center gap-1.5", week.parsial && "opacity-70")}>
                  {SERIES.map((series) => (
                    <div
                      key={series.key}
                      className={cn("relative w-1/2 max-w-8 rounded-t-md", series.className)}
                      style={{ height: `${(week[series.key] / maxValue) * 100}%` }}
                      title={`${series.label}: ${week[series.key]}`}
                    >
                      {week.catatan && series.key === "sekolah" && (
                        <span className="absolute -top-7 left-0 rounded-full bg-tertiary-container px-2 py-0.5 text-[10px] font-bold whitespace-nowrap text-on-tertiary-container">
                          {week.catatan}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex min-w-[420px] justify-between gap-3 pt-2">
            {tren.map((week) => (
              <span key={week.label} className="flex-1 text-center text-[11px] font-semibold text-on-surface-variant">
                {week.label}
              </span>
            ))}
          </div>
        </div>
        <figcaption className="mt-4 border-t border-outline-variant/40 pt-4 text-xs leading-[18px] text-on-surface-variant">
          <p className="flex items-start gap-2">
            <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            Kunjungan tertinggi terjadi pada hari Sabtu &amp; Minggu (68% total reservasi).
          </p>
          <p className="mt-2 font-semibold text-primary">Rata-rata 110 siswa per hari sesi belajar</p>
        </figcaption>
      </figure>
    </Card>
  );
}
