"use client";

import { Archive, Download, FileText, FolderOpen, IdCard, type LucideIcon } from "lucide-react";
import { IconTile, type IconTileTone } from "@/components/ui/IconTile";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";
import type { LaporanData } from "@/types";

const JENIS_META: Record<LaporanData["unduhan"][number]["jenis"], { icon: LucideIcon; tone: IconTileTone }> = {
  kas: { icon: FileText, tone: "primary" },
  sertifikat: { icon: IdCard, tone: "secondary" },
  rekap: { icon: Archive, tone: "tertiary" },
};

export function QuickDownloadsCard({ unduhan, className }: { unduhan: LaporanData["unduhan"]; className?: string }) {
  const { showToast } = useToast();

  return (
    <section className={cn("rounded-2xl bg-surface-container p-5 sm:p-6", className)}>
      <h2 className="flex items-center gap-3 text-xl leading-7 font-semibold text-on-surface">
        <FolderOpen className="size-5 shrink-0 text-primary" aria-hidden />
        Unduhan Cepat Paguyuban
      </h2>
      <p className="mt-3 text-xs leading-[18px] text-on-surface-variant">
        Arsip berkas administrasi siap cetak untuk pelaporan dinas dan pembukuan pengrajin.
      </p>
      <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-1">
        {unduhan.map((file) => {
          const { icon: Icon, tone } = JENIS_META[file.jenis];
          return (
            <li key={file.judul}>
              <button
                type="button"
                onClick={() => showToast(`Mengunduh "${file.judul}"…`, "info")}
                className="flex w-full items-center gap-3 rounded-xl bg-surface-lowest p-3 text-left shadow-card transition hover:shadow-soft"
              >
                <IconTile tone={tone} size="md">
                  <Icon />
                </IconTile>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-on-surface">{file.judul}</span>
                  <span className="block text-[11px] leading-[17px] text-on-surface-variant">{file.detail}</span>
                </span>
                <Download className="size-4 shrink-0 text-on-surface-variant" aria-hidden />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
