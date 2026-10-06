"use client";

import { Pencil, Phone, Signpost, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import type { Toko } from "@/types";
import { STATUS_TOKO, TokoBadge, spesialisasiTone } from "./tokoMeta";

interface TokoTableProps {
  rows: Toko[];
  selected: Set<string>;
  onToggleRow: (slug: string) => void;
  onToggleAll: (checked: boolean) => void;
  onDelete: (toko: Toko) => void;
}

const TH = "px-3 py-4 text-left text-overline text-on-surface-variant";

function TokoIdentity({ toko }: { toko: Toko }) {
  const isInactive = toko.status === "nonaktif";
  return (
    <div className={cn("flex min-w-0 items-center gap-4", isInactive && "opacity-60")}>
      <span className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-surface-high">
        <Image src={toko.foto} alt={`Foto ${toko.nama}`} fill sizes="48px" className="object-cover" />
      </span>
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-lg leading-6 font-medium text-on-surface">
          <span className="truncate">{toko.nama}</span>
          <TokoBadge badge={toko.badge} />
        </p>
        <p className="truncate text-xs leading-[18px] text-on-surface-variant">
          {toko.status === "menunggu" ? toko.keterangan : `NIB: ${toko.nib} • ${toko.keterangan}`}
        </p>
      </div>
    </div>
  );
}

function RowActions({ toko, onDelete }: { toko: Toko; onDelete: (toko: Toko) => void }) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/toko/${toko.slug}`}
        aria-label={`Edit ${toko.nama}`}
        title="Edit toko"
        className="inline-flex size-9 items-center justify-center rounded-lg bg-surface-low text-on-surface transition hover:bg-surface-high"
      >
        <Pencil className="size-4" />
      </Link>
      <button
        type="button"
        onClick={() => onDelete(toko)}
        aria-label={`Hapus ${toko.nama}`}
        title="Hapus toko"
        className="inline-flex size-9 items-center justify-center rounded-lg bg-error-container/60 text-error transition hover:bg-error-container"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}

export function TokoTable({ rows, selected, onToggleRow, onToggleAll, onDelete }: TokoTableProps) {
  if (rows.length === 0) {
    return <EmptyState title="Toko tidak ditemukan" description="Coba ubah kata kunci atau reset filter untuk menampilkan semua toko." />;
  }

  const allSelected = rows.every((toko) => selected.has(toko.slug));

  return (
    <>
      {/* Tablet & desktop: tabel penuh, dapat digeser horizontal di dalam kontainernya sendiri. */}
      <div className="scrollbar-thin relative hidden overflow-x-auto md:block">
        <table className="w-full min-w-[920px] border-collapse">
          <thead className="bg-surface-container/70">
            <tr>
              <th className="w-12 py-4 pl-5">
                <Checkbox label="Pilih semua toko" srOnlyLabel checked={allSelected} onChange={(event) => onToggleAll(event.target.checked)} />
              </th>
              <th className={TH}>Toko &amp; Gerai</th>
              <th className={TH}>Pemilik / Pengrajin</th>
              <th className={TH}>Lokasi Gang</th>
              <th className={TH}>Spesialisasi</th>
              <th className={cn(TH, "text-center")}>Produk SKU</th>
              <th className={TH}>Status Paguyuban</th>
              <th className={cn(TH, "pr-5")}>Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {rows.map((toko) => {
              const status = STATUS_TOKO[toko.status];
              return (
                <tr key={toko.slug} className={cn("transition hover:bg-surface-low/60", selected.has(toko.slug) && "bg-primary-fixed/20")}>
                  <td className="py-5 pl-5 align-middle">
                    <Checkbox label={`Pilih ${toko.nama}`} srOnlyLabel checked={selected.has(toko.slug)} onChange={() => onToggleRow(toko.slug)} />
                  </td>
                  <td className="max-w-[250px] px-3 py-5">
                    <TokoIdentity toko={toko} />
                  </td>
                  <td className="px-3 py-5">
                    <p className="text-xs font-semibold text-on-surface">{toko.pemilik}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs whitespace-nowrap text-on-surface-variant">
                      <Phone className="size-3" aria-hidden />
                      {toko.whatsapp}
                    </p>
                  </td>
                  <td className="px-3 py-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-low px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap text-on-surface">
                      <Signpost className="size-3.5 text-primary" aria-hidden />
                      {toko.lokasiGang}
                    </span>
                  </td>
                  <td className="px-3 py-5">
                    <Badge tone={spesialisasiTone(toko.spesialisasi)} className="rounded-md whitespace-nowrap">
                      {toko.spesialisasi}
                    </Badge>
                  </td>
                  <td className="px-3 py-5 text-center text-xl font-medium text-on-surface">{toko.jumlahProduk}</td>
                  <td className="px-3 py-5">
                    <Badge tone={status.tone} icon={status.icon} className="py-1 whitespace-nowrap">
                      {status.label}
                    </Badge>
                  </td>
                  <td className="py-5 pr-5 pl-3">
                    <RowActions toko={toko} onDelete={onDelete} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Ponsel: setiap toko ditampilkan sebagai kartu agar tidak ada overflow. */}
      <ul className="divide-y divide-outline-variant/30 md:hidden">
        {rows.map((toko) => {
          const status = STATUS_TOKO[toko.status];
          return (
            <li key={toko.slug} className="flex flex-col gap-3 p-4">
              <div className="flex items-start gap-3">
                <Checkbox label={`Pilih ${toko.nama}`} srOnlyLabel checked={selected.has(toko.slug)} onChange={() => onToggleRow(toko.slug)} className="mt-4" />
                <TokoIdentity toko={toko} />
              </div>
              <div className="flex flex-wrap gap-2 pl-7">
                <Badge tone={status.tone} icon={status.icon}>
                  {status.label}
                </Badge>
                <Badge tone={spesialisasiTone(toko.spesialisasi)}>{toko.spesialisasi}</Badge>
                <Badge tone="surface" icon={<Signpost className="size-3" aria-hidden />}>
                  {toko.lokasiGang}
                </Badge>
              </div>
              <div className="flex items-center justify-between gap-3 pl-7">
                <p className="min-w-0 text-xs text-on-surface-variant">
                  <span className="font-semibold text-on-surface">{toko.pemilik}</span> • {toko.jumlahProduk} SKU
                </p>
                <RowActions toko={toko} onDelete={onDelete} />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
