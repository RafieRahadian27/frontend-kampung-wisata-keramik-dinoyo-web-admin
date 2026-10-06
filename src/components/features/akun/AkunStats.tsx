import { CalendarDays, CircleCheck, ClipboardClock, Clock, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { MetricCard } from "@/components/ui/MetricCard";
import type { RingkasanAkun } from "@/types";

export function AkunStats({ ringkasan }: { ringkasan: RingkasanAkun }) {
  return (
    <section aria-label="Ringkasan akun" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Total Akun Terdaftar"
        value={`${ringkasan.total} Akun`}
        icon={<Users />}
        iconTone="primary"
        footer={
          <span className="flex items-center gap-1.5 font-semibold">
            <CalendarDays className="size-3.5" aria-hidden />
            {ringkasan.tokoAktif} Toko Aktif Beroperasi
          </span>
        }
      />
      <MetricCard
        label="Akun Aktif"
        value={`${ringkasan.aktif} Pengrajin`}
        valueClassName="text-secondary"
        icon={<CircleCheck />}
        iconTone="secondary"
        footer={<Badge tone="secondary">Siap Kelola Katalog</Badge>}
      />
      <MetricCard
        label="Menunggu Aktivasi"
        value={`${ringkasan.menunggu} Akun`}
        valueClassName="text-tertiary"
        icon={<ClipboardClock />}
        iconTone="tertiary"
        footer={<Badge tone="tertiary">Permintaan Verifikasi Baru</Badge>}
      />
      <MetricCard
        label="Terakhir Login Hari Ini"
        value={`${ringkasan.sesiHariIni} Sesi`}
        icon={<Clock />}
        iconTone="neutral"
        footer={
          <span className="flex items-center gap-1.5 font-semibold text-secondary">
            <TrendingUp className="size-3.5" aria-hidden />
            {ringkasan.persenAktifPekan}% Aktif Pekan Ini
          </span>
        }
      />
    </section>
  );
}
