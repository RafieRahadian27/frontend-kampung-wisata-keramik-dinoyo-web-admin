import type { Metadata } from "next";
import { Download, UserPlus } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Eyebrow, PageHeader } from "@/components/ui/PageHeader";
import { ToastButton } from "@/components/ui/ToastButton";
import { RIWAYAT_AKUN } from "@/data/aktivitas";
import { getAkunList } from "@/lib/api/server";
import { requirePermission } from "@/lib/dal";
import { AccountActivityLog } from "./components/AccountActivityLog";
import { AkunManager } from "./components/AkunManager";
import { AkunStats } from "./components/AkunStats";
import { SupportCard } from "./components/SupportCard";

export const metadata: Metadata = { title: "Kelola Akun Pengrajin" };

export default async function KelolaAkunPage() {
  await requirePermission("akun:read");
  const { data, ringkasan } = await getAkunList();

  return (
    <>
      <PageHeader
        eyebrow={
          <div className="flex flex-col gap-3">
            <Breadcrumb items={[{ label: "Beranda", href: "/dashboard" }, { label: "Kelola Akun" }]} />
            <Eyebrow tone="secondary">Manajemen Hak Akses &amp; Pengguna</Eyebrow>
          </div>
        }
        title="Kelola Akun Pengrajin & Anggota"
        description="Atur hak akses login pengrajin sentra keramik Dinoyo, verifikasi akun toko baru, reset kata sandi, dan status keaktifan dalam paguyuban."
        actions={
          <>
            <ToastButton variant="tonal" size="lg" message="Data akun pengrajin sedang diekspor.">
              <Download className="size-4" aria-hidden />
              Unduh Data Akun
            </ToastButton>
            <ToastButton size="lg" message="Formulir akun pengrajin baru sedang disiapkan.">
              <UserPlus className="size-4" aria-hidden />
              Tambah Akun Pengrajin
            </ToastButton>
          </>
        }
      />
      <AkunStats ringkasan={ringkasan} />
      <AkunManager initialAkun={data} total={ringkasan.total} />
      {/* Riwayat login & perubahan akses (data statis sementara) */}
      <AccountActivityLog riwayat={RIWAYAT_AKUN} />
      <SupportCard />
    </>
  );
}
