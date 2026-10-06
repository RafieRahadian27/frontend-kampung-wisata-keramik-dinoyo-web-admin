import type { BadgeTone } from "@/components/ui/Badge";
import type { PeranAkun, StatusAkun } from "@/types";

export const STATUS_AKUN: Record<StatusAkun, { label: string; tone: BadgeTone }> = {
  aktif: { label: "Aktif", tone: "secondary" },
  menunggu: { label: "Menunggu Verifikasi", tone: "tertiary" },
  ditangguhkan: { label: "Ditangguhkan", tone: "neutral" },
};

export const PERAN_TONE: Record<PeranAkun, BadgeTone> = {
  "Pemilik Toko": "primary",
  "Staf Pengrajin": "secondary",
};

export const PERAN_OPTIONS = [
  { value: "", label: "Semua Peran" },
  { value: "Pemilik Toko", label: "Pemilik Toko" },
  { value: "Staf Pengrajin", label: "Staf Pengrajin" },
];

export const STATUS_OPTIONS = [
  { value: "", label: "Status Akun" },
  { value: "aktif", label: "Aktif" },
  { value: "menunggu", label: "Menunggu Verifikasi" },
  { value: "ditangguhkan", label: "Ditangguhkan" },
];

export const LORONG_OPTIONS = [
  { value: "", label: "Afiliasi Lorong" },
  { value: "Gg. IX", label: "Gang IX" },
  { value: "Gg. X", label: "Gang X" },
  { value: "Jl. MT Haryono", label: "Jl. MT Haryono" },
];
