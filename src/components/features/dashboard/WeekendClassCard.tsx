import { Palette } from "lucide-react";
import Link from "next/link";
import { IconTile } from "@/components/ui/IconTile";

export function WeekendClassCard({ judul, catatan }: { judul: string; catatan: string }) {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-surface-container p-5 sm:p-6">
      <div className="flex min-w-0 items-center gap-4">
        <IconTile tone="solid-tertiary">
          <Palette />
        </IconTile>
        <div className="min-w-0">
          <h2 className="text-lg leading-7 font-semibold text-on-surface sm:text-xl">{judul}</h2>
          <p className="text-xs leading-[18px] text-on-surface-variant">{catatan}</p>
        </div>
      </div>
      <Link
        href="/laporan"
        className="shrink-0 rounded-lg bg-surface-lowest px-3 py-1.5 text-[11px] font-semibold text-primary shadow-card transition hover:bg-surface-low"
      >
        Cek Jadwal
      </Link>
    </section>
  );
}
