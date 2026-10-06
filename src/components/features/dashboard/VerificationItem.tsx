"use client";

import { Check, Eye, History, X } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import type { PengajuanToko } from "@/types";

export type Keputusan = "verifikasi" | "tolak";

interface VerificationItemProps {
  item: PengajuanToko;
  isBusy: boolean;
  onDecision: (item: PengajuanToko, keputusan: Keputusan) => void;
}

/** Child component: hanya menampilkan data dari props & memanggil callback parent. */
export function VerificationItem({ item, isBusy, onDecision }: VerificationItemProps) {
  const { showToast } = useToast();

  return (
    <li className="flex flex-col gap-4 rounded-xl bg-surface-low p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 gap-4">
        <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-surface-high">
          <Image src={item.foto} alt={`Foto ${item.nama}`} fill sizes="56px" className="object-cover" />
        </span>
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-col items-start gap-2">
            <h3 className="text-lg leading-7 font-semibold text-on-surface sm:text-xl">{item.nama}</h3>
            <Badge tone="secondary">{item.lokasiGang}</Badge>
          </div>
          <p className="text-xs leading-[18px] text-on-surface-variant">
            Pengrajin: {item.pengrajin} <span aria-hidden>•</span> Keahlian: {item.keahlian}
          </p>
          <p className="flex items-center gap-1 text-[11px] font-medium text-primary">
            <History className="size-3" aria-hidden />
            {item.diajukan}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 self-end md:self-center">
        <Button variant="tonal" size="sm" onClick={() => showToast(`Membuka berkas ${item.nama}…`, "info")} disabled={isBusy}>
          <Eye className="size-3.5" aria-hidden />
          Review
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onDecision(item, "verifikasi")} isLoading={isBusy}>
          {!isBusy && <Check className="size-3.5" aria-hidden />}
          Verifikasi
        </Button>
        <button
          type="button"
          onClick={() => onDecision(item, "tolak")}
          disabled={isBusy}
          aria-label={`Tolak pengajuan ${item.nama}`}
          className="inline-flex size-8 items-center justify-center rounded-lg text-error transition hover:bg-error-container disabled:opacity-50"
        >
          <X className="size-4" />
        </button>
      </div>
    </li>
  );
}
