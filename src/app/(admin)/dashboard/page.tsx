import type { Metadata } from "next";
import { AKTIVITAS_TERBARU } from "@/data/aktivitas";
import { getDashboard } from "@/lib/api/server";
import { requirePermission } from "@/lib/dal";
import { DashboardGreeting } from "./components/DashboardGreeting";
import { KpiGrid } from "./components/KpiGrid";
import { QuickActions } from "./components/QuickActions";
import { RecentActivityCard } from "./components/RecentActivityCard";
import { VerificationPanel } from "./components/VerificationPanel";
import { WeekendClassCard } from "./components/WeekendClassCard";
import { WhatsappTrafficCard } from "./components/WhatsappTrafficCard";

export const metadata: Metadata = { title: "Dashboard" };

/**
 * Server Component: data diambil langsung di server dari Express (dengan cache),
 * lalu diteruskan ke setiap komponen lewat props.
 */
export default async function DashboardPage() {
  await requirePermission("dashboard:read");
  const { admin, tanggal, statistik, verifikasi, whatsapp, kelasAkhirPekan } = await getDashboard();

  return (
    <>
      <DashboardGreeting admin={admin} tanggal={tanggal} />
      <KpiGrid statistik={statistik} />
      {/* Split 7/5: antrean verifikasi toko di kiri, trafik WhatsApp & kelas akhir pekan di kanan. */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <VerificationPanel
          className="xl:col-span-7"
          pengajuan={verifikasi.pengajuan}
          terakhirDisetujui={verifikasi.terakhirDisetujui}
          totalPendaftar={verifikasi.totalPendaftarTahunIni}
        />
        <div className="flex flex-col gap-5 xl:col-span-5">
          <WhatsappTrafficCard whatsapp={whatsapp} />
          <WeekendClassCard {...kelasAkhirPekan} />
        </div>
      </div>
      {/* Linimasa aktivitas terbaru — sementara memakai data statis sampai endpoint audit log tersedia. */}
      <RecentActivityCard aktivitas={AKTIVITAS_TERBARU} />
      <QuickActions />
    </>
  );
}
