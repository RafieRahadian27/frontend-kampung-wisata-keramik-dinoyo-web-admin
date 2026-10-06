import { Download, UserPlus } from "lucide-react";
import type { Metadata } from "next";
import { AkunManager } from "@/components/features/akun/AkunManager";
import { AkunStats } from "@/components/features/akun/AkunStats";
import { SupportCard } from "@/components/features/akun/SupportCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ToastButton } from "@/components/ui/ToastButton";
import { Eyebrow, PageHeader } from "@/components/ui/PageHeader";
import { getAkunList } from "@/lib/api/server";

export const metadata: Metadata = { title: "Kelola Akun Pengrajin" };

export default async function KelolaAkunPage() {
  const { data, ringkasan } = await getAkunList();

  return (
    <div className="flex flex-col gap-8">
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
      <SupportCard />
    </div>
  );
}
