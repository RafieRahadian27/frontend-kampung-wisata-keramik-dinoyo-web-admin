import { Archive, CircleCheck, Clock, Flame, Sprout } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";
import type { RingkasanProduk } from "@/types";

export function ProdukStats({ ringkasan }: { ringkasan: RingkasanProduk }) {
  return (
    <section aria-label="Ringkasan katalog" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Total Koleksi"
        value={ringkasan.totalKoleksi}
        icon={<Sprout />}
        iconTone="primary"
        footer={
          <span className="flex items-center gap-1.5 text-secondary">
            <CircleCheck className="size-3.5" aria-hidden />
            {ringkasan.pengrajin} Pengrajin Terdaftar
          </span>
        }
      />
      <MetricCard
        label="Stok Tersedia"
        value={ringkasan.stokTersedia}
        icon={<Archive />}
        iconTone="secondary"
        footer={
          <span className="flex items-center gap-1.5 text-secondary">
            <CircleCheck className="size-3.5" aria-hidden />
            Siap display &amp; kirim
          </span>
        }
      />
      <MetricCard
        label="Antrean Pre-Order"
        value={ringkasan.preOrder}
        icon={<Flame />}
        iconTone="tertiary"
        footer={
          <span className="flex items-center gap-1.5 text-tertiary-bright">
            <Clock className="size-3.5" aria-hidden />
            Firing kiln cycle aktif
          </span>
        }
      />
      <article className="flex flex-col justify-between gap-4 rounded-2xl bg-surface-high p-5 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <p className="text-overline text-on-surface">Suhu Bakar Rata-rata</p>
          <p className="text-xs font-bold text-primary">{ringkasan.suhuBakar}</p>
        </div>
        <div className="flex h-2 gap-1 overflow-hidden rounded-full" aria-hidden>
          <span className="w-[66%] bg-secondary" />
          <span className="w-[25%] bg-primary-container" />
          <span className="w-[9%] bg-tertiary" />
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs leading-[18px] text-on-surface-variant">
          <span>Glazed Stoneware</span>
          <span className="text-on-surface">Porselen Dinoyo</span>
        </div>
      </article>
    </section>
  );
}
