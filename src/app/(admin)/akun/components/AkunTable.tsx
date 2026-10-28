"use client";

import { MessageSquareText, Pencil } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import type { Akun } from "@/types";
import { PERAN_TONE, STATUS_AKUN } from "./akunMeta";

interface AkunTableProps {
  rows: Akun[];
  selected: Set<number>;
  onToggleRow: (id: number) => void;
  onToggleAll: (checked: boolean) => void;
  onEdit: (akun: Akun) => void;
}

const TH = "px-4 py-4 text-left text-overline text-on-surface-variant";

function AkunIdentity({ akun }: { akun: Akun }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar name={akun.nama} initials={akun.inisial} tone={akun.tone} size="md" />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-on-surface sm:text-base">{akun.nama}</p>
        <p className="truncate text-xs text-on-surface-variant">NIK: {akun.nik}</p>
        <p className="truncate text-xs text-on-surface-variant">{akun.email}</p>
      </div>
    </div>
  );
}

function EditButton({ akun, onEdit }: { akun: Akun; onEdit: (akun: Akun) => void }) {
  return (
    <button
      type="button"
      onClick={() => onEdit(akun)}
      aria-label={`Ubah status akun ${akun.nama}`}
      title="Ubah status akun"
      className="inline-flex size-9 items-center justify-center rounded-lg text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface"
    >
      <Pencil className="size-4" />
    </button>
  );
}

export function AkunTable({ rows, selected, onToggleRow, onToggleAll, onEdit }: AkunTableProps) {
  if (rows.length === 0) {
    return <EmptyState title="Akun tidak ditemukan" description="Tidak ada akun pengrajin yang cocok dengan filter." />;
  }

  return (
    <>
      <div className="scrollbar-thin relative hidden overflow-x-auto md:block">
        <table className="w-full min-w-[960px] border-collapse">
          <thead className="bg-surface-low">
            <tr>
              <th className="w-14 py-4 pl-6">
                <Checkbox label="Pilih semua akun" srOnlyLabel checked={rows.every((akun) => selected.has(akun.id))} onChange={(event) => onToggleAll(event.target.checked)} />
              </th>
              <th className={TH}>Pengrajin &amp; Identitas</th>
              <th className={TH}>Toko / Studio Binaan</th>
              <th className={TH}>Peran &amp; Akses</th>
              <th className={TH}>Kontak WhatsApp</th>
              <th className={TH}>Status Akun</th>
              <th className={TH}>Terakhir Aktif</th>
              <th className="w-16 pr-6">
                <span className="sr-only">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {rows.map((akun) => {
              const status = STATUS_AKUN[akun.status];
              return (
                <tr key={akun.id} className={cn("transition hover:bg-surface-low/60", selected.has(akun.id) && "bg-primary-fixed/20")}>
                  <td className="py-5 pl-6">
                    <Checkbox label={`Pilih ${akun.nama}`} srOnlyLabel checked={selected.has(akun.id)} onChange={() => onToggleRow(akun.id)} />
                  </td>
                  <td className="max-w-[300px] px-4 py-5">
                    <AkunIdentity akun={akun} />
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-xs font-semibold text-on-surface">{akun.toko}</p>
                    <span className="mt-1 inline-block rounded bg-surface-container px-2 py-0.5 text-[11px] font-semibold text-on-surface-variant">
                      {akun.lokasi}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <Badge tone={PERAN_TONE[akun.peran]} dot className="whitespace-nowrap">
                      {akun.peran}
                    </Badge>
                  </td>
                  <td className="px-4 py-5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap text-on-surface">
                      <MessageSquareText className="size-3.5 text-on-surface-variant" aria-hidden />
                      {akun.whatsapp}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <Badge tone={status.tone} dot className="whitespace-nowrap">
                      {status.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-5 text-xs text-on-surface-variant">{akun.terakhirAktif}</td>
                  <td className="py-5 pr-6">
                    <EditButton akun={akun} onEdit={onEdit} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-outline-variant/30 md:hidden">
        {rows.map((akun) => {
          const status = STATUS_AKUN[akun.status];
          return (
            <li key={akun.id} className="flex flex-col gap-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <AkunIdentity akun={akun} />
                <EditButton akun={akun} onEdit={onEdit} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge tone={status.tone} dot>
                  {status.label}
                </Badge>
                <Badge tone={PERAN_TONE[akun.peran]}>{akun.peran}</Badge>
              </div>
              <p className="text-xs text-on-surface-variant">
                <span className="font-semibold text-on-surface">{akun.toko}</span> • {akun.whatsapp} • {akun.terakhirAktif}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
