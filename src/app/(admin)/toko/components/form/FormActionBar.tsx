"use client";

import { Eye, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FormActionBarProps {
  isDirty: boolean;
  lastSaved?: string;
  submitting: "publish" | "draft" | null;
  onSaveDraft: () => void;
  onPreview: () => void;
}

function formatJam(iso?: string) {
  if (!iso) return null;
  return new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" }).format(new Date(iso));
}

/** Bilah aksi melayang di bawah formulir (sticky) — status perubahan + tombol simpan/publikasi. */
export function FormActionBar({ isDirty, lastSaved, submitting, onSaveDraft, onPreview }: FormActionBarProps) {
  const jam = formatJam(lastSaved);

  return (
    <div className="sticky bottom-4 z-20 flex flex-col gap-4 rounded-2xl border border-outline-variant/30 bg-surface-lowest/95 p-4 shadow-float backdrop-blur xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-start gap-3">
        <span className={cn("mt-1.5 size-2.5 shrink-0 rounded-full", isDirty ? "bg-secondary" : "bg-outline")} aria-hidden />
        <div>
          <p className="text-sm font-semibold text-on-surface">{isDirty ? "Perubahan Siap Diterapkan" : "Belum Ada Perubahan"}</p>
          <p className="text-[11px] font-semibold text-on-surface-variant">
            {jam ? `Terakhir disimpan pada ${jam} WIB` : "Data belum pernah disimpan"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 xl:flex xl:items-center">
        <Button variant="tonal" onClick={onSaveDraft} isLoading={submitting === "draft"} disabled={submitting !== null}>
          Simpan Sebagai Draf
        </Button>
        <Button variant="ghost" onClick={onPreview} className="text-secondary">
          <Eye className="size-4" aria-hidden />
          Pratinjau Halaman Publik
        </Button>
        <Button type="submit" isLoading={submitting === "publish"} disabled={submitting !== null} className="px-6">
          {submitting !== "publish" && <Upload className="size-4" aria-hidden />}
          Publikasikan Toko
        </Button>
      </div>
    </div>
  );
}
