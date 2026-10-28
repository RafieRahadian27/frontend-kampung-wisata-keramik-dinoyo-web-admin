import { BadgeCheck, ClipboardClock, Sprout, Store } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";
import type { RingkasanToko } from "@/types";

export function TokoStats({ ringkasan }: { ringkasan: RingkasanToko }) {
  return (
    <section aria-label="Ringkasan toko" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Total Gerai UMKM" value={ringkasan.total} unit="Toko Terdata" icon={<Store />} iconTone="neutral" />
      <MetricCard label="Terverifikasi Dinoyo" value={ringkasan.terverifikasi} unit="Gerai" icon={<BadgeCheck />} iconTone="secondary" valueClassName="text-secondary" />
      <MetricCard label="Menunggu Kurasi" value={ringkasan.menunggu} unit="Pemilik Baru" icon={<ClipboardClock />} iconTone="tertiary" valueClassName="text-tertiary" />
      <MetricCard label="Katalog Produk Aktif" value={ringkasan.katalogAktif} unit="SKU Keramik" icon={<Sprout />} iconTone="primary" valueClassName="text-primary" />
    </section>
  );
}
