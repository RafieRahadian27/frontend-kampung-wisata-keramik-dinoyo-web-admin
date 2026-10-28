import type { Metadata } from "next";
import { House } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Eyebrow, PageHeader } from "@/components/ui/PageHeader";
import { getLaporan } from "@/lib/api/server";
import { requirePermission } from "@/lib/dal";
import { BestPackagesCard } from "./components/BestPackagesCard";
import { DistrictDistributionCard } from "./components/DistrictDistributionCard";
import { QuickDownloadsCard } from "./components/QuickDownloadsCard";
import { ReportStats } from "./components/ReportStats";
import { ReportToolbar } from "./components/ReportToolbar";
import { ReservationHistory } from "./components/ReservationHistory";
import { VisitTrendChart } from "./components/VisitTrendChart";

export const metadata: Metadata = { title: "Laporan Kunjungan & Reservasi" };

export default async function LaporanPage() {
  await requirePermission("laporan:read");
  const laporan = await getLaporan();

  return (
    <>
      <div className="flex flex-col gap-5">
        <PageHeader
          eyebrow={
            <div className="flex flex-col gap-3">
              <Breadcrumb items={[{ label: "Beranda", href: "/dashboard", icon: <House /> }, { label: "Laporan & Kunjungan" }]} />
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow tone="secondary" icon={false}>
                  Statistik Eduwisata &amp; Analitik Paguyuban
                </Eyebrow>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-on-surface-variant">
                  <span className="size-2 animate-pulse rounded-full bg-secondary" aria-hidden />
                  Real-time Update (Oktober 2024)
                </span>
              </div>
            </div>
          }
          title="Laporan Kunjungan & Reservasi Workshop"
          description="Pantau arus wisatawan edukasi, pemesanan workshop tanah liat, transaksi kriya, dan statistik klik WhatsApp pengrajin secara real-time di Kampung Dinoyo."
        />
        <ReportToolbar periode={laporan.periode} />
      </div>
      <ReportStats ringkasan={laporan.ringkasan} />
      {/* Kolom utama (tren & riwayat reservasi) + kolom samping 320px (sebaran, paket, unduhan). */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-6">
          <VisitTrendChart tren={laporan.tren} />
          <ReservationHistory reservasi={laporan.reservasi} />
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1">
          <DistrictDistributionCard sebaran={laporan.sebaranLorong} />
          <BestPackagesCard paket={laporan.paketTerlaris} />
          <QuickDownloadsCard unduhan={laporan.unduhan} className="md:col-span-2 xl:col-span-1" />
        </div>
      </div>
    </>
  );
}
