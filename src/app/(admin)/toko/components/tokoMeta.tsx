import { Award, CircleCheck, CirclePause, Hourglass, Medal } from "lucide-react";
import type { ReactNode } from "react";
import type { BadgeTone } from "@/components/ui/Badge";
import type { BadgeToko, StatusToko } from "@/types";

/** Pemetaan status/spesialisasi toko ke warna & ikon badge — dipakai tabel dan kartu mobile. */
export const STATUS_TOKO: Record<StatusToko, { label: string; tone: BadgeTone; icon: ReactNode }> = {
  terverifikasi: { label: "Terverifikasi", tone: "secondary", icon: <CircleCheck className="size-3.5" aria-hidden /> },
  menunggu: { label: "Menunggu Review", tone: "tertiary", icon: <Hourglass className="size-3.5" aria-hidden /> },
  nonaktif: { label: "Nonaktif", tone: "neutral", icon: <CirclePause className="size-3.5" aria-hidden /> },
};

const SPESIALISASI_TONE: Record<string, BadgeTone> = {
  "Semi-Porselen": "secondary",
  "Gerabah Alami": "tertiary",
  "Custom & Art": "primary",
};

export function spesialisasiTone(spesialisasi: string): BadgeTone {
  return SPESIALISASI_TONE[spesialisasi] ?? "surface";
}

export function TokoBadge({ badge }: { badge?: BadgeToko }) {
  if (badge === "baru") {
    return <span className="rounded bg-tertiary px-1.5 py-0.5 text-[10px] font-bold text-white uppercase dark:text-on-tertiary-container">Baru</span>;
  }
  if (badge === "unggulan") return <Award className="size-4 shrink-0 text-secondary" aria-label="Toko unggulan" />;
  if (badge === "maestro") return <Medal className="size-4 shrink-0 text-tertiary-bright" aria-label="Pengrajin maestro" />;
  return null;
}

export const LOKASI_OPTIONS = [
  { value: "", label: "Semua Lokasi / Gang" },
  { value: "Gg. IX", label: "Gang IX" },
  { value: "Gg. X", label: "Gang X" },
  { value: "Jl. MT Haryono", label: "Jl. MT Haryono" },
];

export const KATEGORI_OPTIONS = [
  { value: "", label: "Semua Kategori Produk" },
  { value: "Semi-Porselen", label: "Semi-Porselen" },
  { value: "Gerabah Alami", label: "Gerabah Alami" },
  { value: "Galeri Suvenir", label: "Galeri Suvenir" },
  { value: "Custom & Art", label: "Custom & Art" },
];
