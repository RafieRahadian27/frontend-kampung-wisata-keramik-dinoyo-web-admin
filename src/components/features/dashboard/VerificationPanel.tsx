"use client";

import { ArrowRight, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/context/ToastContext";
import { invalidateCache } from "@/lib/actions/cache";
import { tokoApi } from "@/lib/api/client";
import { CACHE_TAGS } from "@/lib/api/config";
import { cn } from "@/lib/utils";
import type { PengajuanToko } from "@/types";
import { VerificationItem, type Keputusan } from "./VerificationItem";

interface VerificationPanelProps {
  pengajuan: PengajuanToko[];
  terakhirDisetujui: { nama: string; catatan: string };
  totalPendaftar: number;
  className?: string;
}

/**
 * Komponen parent yang memegang state daftar pengajuan. Setiap item (child)
 * menerima data + callback lewat props, lalu parent memperbarui state setelah API sukses.
 */
export function VerificationPanel({ pengajuan, terakhirDisetujui, totalPendaftar, className }: VerificationPanelProps) {
  const { showToast } = useToast();
  const [items, setItems] = useState(pengajuan);
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [lastApproved, setLastApproved] = useState(terakhirDisetujui);

  const handleDecision = async (item: PengajuanToko, keputusan: Keputusan) => {
    setBusySlug(item.slug);
    try {
      const { message } = await tokoApi.putuskanPengajuan(item.slug, keputusan);
      setItems((current) => current.filter((entry) => entry.slug !== item.slug));
      if (keputusan === "verifikasi") {
        setLastApproved({ nama: item.nama, catatan: "Baru saja diverifikasi oleh Anda" });
      }
      showToast(message, keputusan === "verifikasi" ? "success" : "info");
      await invalidateCache([CACHE_TAGS.dashboard, CACHE_TAGS.toko]);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Gagal memproses pengajuan", "error");
    } finally {
      setBusySlug(null);
    }
  };

  return (
    <section className={cn("flex flex-col rounded-2xl bg-surface-lowest p-4 shadow-card sm:p-6", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3 pb-4">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 font-serif text-xl leading-7 font-semibold text-on-surface sm:text-2xl sm:leading-8">
            <span className="size-2.5 shrink-0 rounded-full bg-primary" aria-hidden />
            Persetujuan &amp; Verifikasi Toko
          </h2>
          <p className="mt-0.5 text-xs leading-[18px] text-on-surface-variant">
            Pengrajin mengajukan pendaftaran direktori resmi Paguyuban Dinoyo
          </p>
        </div>
        <Badge tone="primary" className="px-3 py-1">
          {items.length} Menunggu Review
        </Badge>
      </div>

      <ul className="flex flex-col gap-4 pt-2">
        {items.map((item) => (
          <VerificationItem key={item.slug} item={item} isBusy={busySlug === item.slug} onDecision={handleDecision} />
        ))}
        {items.length === 0 && (
          <li>
            <EmptyState title="Semua pengajuan sudah ditinjau" description="Tidak ada toko yang menunggu verifikasi saat ini." />
          </li>
        )}

        <li className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-container/50 p-4">
          <div className="flex min-w-0 items-center gap-4">
            <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-xl bg-secondary-container text-secondary">
              <BadgeCheck className="size-6" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2 text-lg leading-7 font-medium text-on-surface">
                {lastApproved.nama}
                <Badge tone="secondary">Terverifikasi</Badge>
              </p>
              <p className="text-xs leading-[18px] text-on-surface-variant">{lastApproved.catatan}</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-secondary">Toko Aktif di Publik</span>
        </li>
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant/30 pt-4">
        <p className="text-xs leading-[18px] text-on-surface-variant">
          Menampilkan {items.length} toko tertunda dari total {totalPendaftar} pendaftar tahun ini
        </p>
        <Link href="/toko" className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline">
          Lihat Semua Riwayat Toko
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
