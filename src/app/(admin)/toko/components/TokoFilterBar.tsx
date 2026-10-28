"use client";

import { Navigation, RotateCcw, Shapes } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { SearchInput } from "@/components/ui/SearchInput";
import type { StatusToko } from "@/types";
import { KATEGORI_OPTIONS, LOKASI_OPTIONS } from "./tokoMeta";

export interface TokoFilters {
  keyword: string;
  lokasi: string;
  kategori: string;
  status: StatusToko | "semua";
}

interface TokoFilterBarProps {
  filters: TokoFilters;
  statusCounts: Record<StatusToko | "semua", number>;
  onChange: (patch: Partial<TokoFilters>) => void;
  onReset: () => void;
}

/** Child component tanpa state sendiri: nilai & handler sepenuhnya dari parent (TokoManager). */
export function TokoFilterBar({ filters, statusCounts, onChange, onReset }: TokoFilterBarProps) {
  const statusOptions = [
    { value: "semua" as const, label: `Semua Status (${statusCounts.semua})` },
    { value: "terverifikasi" as const, label: `Terverifikasi (${statusCounts.terverifikasi})` },
    { value: "menunggu" as const, label: `Menunggu Review (${statusCounts.menunggu})` },
    { value: "nonaktif" as const, label: `Toko Tutup / Nonaktif (${statusCounts.nonaktif})` },
  ];

  return (
    <section aria-label="Filter toko" className="flex flex-col gap-4 rounded-2xl bg-surface-low p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
        <SearchInput
          value={filters.keyword}
          onChange={(keyword) => onChange({ keyword })}
          placeholder="Cari nama toko, galeri, atau pengrajin…"
          label="Cari toko"
        />
        <FilterSelect label="Filter lokasi" icon={<Navigation />} value={filters.lokasi} options={LOKASI_OPTIONS} onChange={(lokasi) => onChange({ lokasi })} />
        <FilterSelect label="Filter kategori" icon={<Shapes />} value={filters.kategori} options={KATEGORI_OPTIONS} onChange={(kategori) => onChange({ kategori })} />
        <Button variant="tonal" onClick={onReset} className="h-11">
          <RotateCcw className="size-4" aria-hidden />
          Reset Filter
        </Button>
      </div>

      <div className="flex flex-col gap-3 border-t border-outline-variant/30 pt-4 lg:flex-row lg:items-center">
        <span className="shrink-0 text-xs font-medium text-on-surface-variant">Status Verifikasi:</span>
        <ChipGroup label="Status verifikasi" size="sm" options={statusOptions} value={filters.status} onChange={(status) => onChange({ status })} />
      </div>
      <p className="flex items-center gap-2 text-[11px] font-semibold text-on-surface-variant">
        <span className="size-2 rounded-full bg-secondary" aria-hidden />
        Akreditasi Diperbarui Tiap Kuartal
      </p>
    </section>
  );
}
