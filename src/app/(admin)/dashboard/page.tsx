import type { Metadata } from "next";
import { DashboardGreeting } from "@/components/features/dashboard/DashboardGreeting";
import { KpiGrid } from "@/components/features/dashboard/KpiGrid";
import { QuickActions } from "@/components/features/dashboard/QuickActions";
import { VerificationPanel } from "@/components/features/dashboard/VerificationPanel";
import { WeekendClassCard } from "@/components/features/dashboard/WeekendClassCard";
import { WhatsappTrafficCard } from "@/components/features/dashboard/WhatsappTrafficCard";
import { getDashboard } from "@/lib/api/server";

export const metadata: Metadata = { title: "Dashboard" };

/**
 * Server Component: data diambil langsung di server dari Express (dengan cache),
 * lalu diteruskan ke komponen anak lewat props.
 */
export default async function DashboardPage() {
  const data = await getDashboard();

  return (
    <div className="flex flex-col gap-8">
      <DashboardGreeting admin={data.admin} tanggal={data.tanggal} />

      <KpiGrid statistik={data.statistik} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <VerificationPanel
          className="xl:col-span-7"
          pengajuan={data.verifikasi.pengajuan}
          terakhirDisetujui={data.verifikasi.terakhirDisetujui}
          totalPendaftar={data.verifikasi.totalPendaftarTahunIni}
        />
        <div className="flex flex-col gap-5 xl:col-span-5">
          <WhatsappTrafficCard whatsapp={data.whatsapp} />
          <WeekendClassCard {...data.kelasAkhirPekan} />
        </div>
      </div>

      <QuickActions />
    </div>
  );
}
