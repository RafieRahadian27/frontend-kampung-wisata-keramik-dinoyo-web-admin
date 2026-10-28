import { ArrowUp, Banknote, Bus, MessageSquareText, MousePointerClick, Palette, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { MetricCard } from "@/components/ui/MetricCard";
import { formatAngka } from "@/lib/utils";
import type { LaporanData } from "@/types";

export function ReportStats({ ringkasan }: { ringkasan: LaporanData["ringkasan"] }) {
  const { totalWisatawan, workshopSelesai, estimasiOmzet, konversiWhatsapp } = ringkasan;

  return (
    <section aria-label="Ringkasan laporan" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        label="Total Wisatawan & Siswa"
        value={formatAngka(totalWisatawan.nilai)}
        icon={<Bus />}
        iconTone="primary"
        footer={
          <span className="flex flex-wrap items-center gap-2">
            <Badge tone="secondary" icon={<TrendingUp className="size-3" aria-hidden />}>
              +{totalWisatawan.pertumbuhan}%
            </Badge>
            {totalWisatawan.pembanding}
          </span>
        }
      />
      <MetricCard
        label="Workshop Selesai"
        value={`${workshopSelesai.nilai} Sesi`}
        icon={<Palette />}
        iconTone="secondary"
        footer={
          <span className="flex flex-wrap items-center gap-2">
            <Badge tone="neutral" dot>
              {workshopSelesai.mendatang} Sesi Mendatang
            </Badge>
            Tingkat okupansi {workshopSelesai.okupansi}%
          </span>
        }
      />
      <MetricCard
        label="Estimasi Omzet UMKM"
        value={estimasiOmzet.nilai}
        valueClassName="text-primary"
        icon={<Banknote />}
        iconTone="tertiary"
        footer={
          <span className="flex flex-wrap items-center gap-2">
            <Badge tone="secondary" icon={<ArrowUp className="size-3" aria-hidden />}>
              +{estimasiOmzet.pertumbuhan}% MoM
            </Badge>
            {estimasiOmzet.keterangan}
          </span>
        }
      />
      <MetricCard
        label="Konversi Klik WhatsApp"
        value={`${formatAngka(konversiWhatsapp.nilai)} Leads`}
        icon={<MessageSquareText />}
        iconTone="neutral"
        footer={
          <span className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-secondary">
              <MousePointerClick className="size-3.5" aria-hidden />
              {konversiWhatsapp.perHari} klik/hari
            </span>
            {konversiWhatsapp.keterangan}
          </span>
        }
      />
    </section>
  );
}
