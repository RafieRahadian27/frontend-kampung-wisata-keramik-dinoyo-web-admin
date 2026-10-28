import { Award, Minus, Star, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";
import type { LaporanData } from "@/types";

const RANK_COLORS = ["bg-primary", "bg-secondary", "bg-tertiary"];

export function BestPackagesCard({ paket }: { paket: LaporanData["paketTerlaris"] }) {
  return (
    <Card>
      <SectionTitle
        variant="sans"
        icon={<Award className="mt-1 size-5 shrink-0 text-primary" aria-hidden />}
        title="Paket Eduwisata Terlaris"
        aside={
          <span className="inline-flex items-center gap-1 rounded-full bg-tertiary-container px-2.5 py-1 text-[11px] font-bold text-tertiary">
            <Star className="size-3" aria-hidden />
            {paket.rating}
          </span>
        }
      />
      <ol className="mt-5 flex flex-col gap-3">
        {paket.daftar.map((item, index) => (
          <li key={item.nama} className="flex items-center gap-3 rounded-xl bg-surface-low p-3">
            <span className={cn("inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white", RANK_COLORS[index] ?? "bg-outline")}>
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-on-surface">{item.nama}</p>
              <p className="text-[11px] leading-[17px] text-on-surface-variant">{item.detail}</p>
            </div>
            {item.tren === "naik" ? (
              <TrendingUp className="size-4 shrink-0 text-secondary" aria-label="Tren naik" />
            ) : (
              <Minus className="size-4 shrink-0 text-on-surface-variant" aria-label="Tren stabil" />
            )}
          </li>
        ))}
      </ol>
    </Card>
  );
}
