import { Map as MapIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";
import type { LaporanData, Tone } from "@/types";

const PERSEN_COLOR: Partial<Record<Tone, string>> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
};

export function DistrictDistributionCard({ sebaran }: { sebaran: LaporanData["sebaranLorong"] }) {
  return (
    <Card>
      <SectionTitle
        variant="sans"
        icon={<MapIcon className="mt-1 size-5 shrink-0 text-on-surface-variant" aria-hidden />}
        title="Sebaran Lorong Sentra"
        aside={<span className="text-[11px] font-semibold text-on-surface-variant">Oktober 2024</span>}
      />
      <p className="mt-3 text-xs leading-[18px] text-on-surface-variant">Konsentrasi kunjungan wisatawan di 4 zona utama sentra keramik Dinoyo.</p>
      <ul className="mt-5 flex flex-col gap-5">
        {sebaran.map((lorong) => (
          <li key={lorong.nama} className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-3 text-xs font-semibold">
              <span className="text-on-surface">{lorong.nama}</span>
              <span className={cn("shrink-0", PERSEN_COLOR[lorong.tone] ?? "text-on-surface")}>{lorong.persen}%</span>
            </div>
            <ProgressBar value={lorong.persen} tone={lorong.tone} label={`Persentase kunjungan ${lorong.nama}`} />
            <p className="text-[11px] text-on-surface-variant">{lorong.detail}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
