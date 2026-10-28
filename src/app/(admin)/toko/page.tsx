import type { Metadata } from "next";
import { CirclePlus, Download, Landmark } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, PageHeader } from "@/components/ui/PageHeader";
import { ToastButton } from "@/components/ui/ToastButton";
import { getTokoList } from "@/lib/api/server";
import { requirePermission } from "@/lib/dal";
import { LorongDistributionCard } from "./components/LorongDistributionCard";
import { TokoManager } from "./components/TokoManager";
import { TokoStats } from "./components/TokoStats";
import { VerificationStandardCard } from "./components/VerificationStandardCard";

export const metadata: Metadata = { title: "Kelola Toko & Pengrajin" };

export default async function KelolaTokoPage() {
  const user = await requirePermission("toko:read");
  const { data, ringkasan } = await getTokoList();

  return (
    <>
      <TokoStats ringkasan={ringkasan} />
      <PageHeader
        eyebrow={<Eyebrow icon={<Landmark />}>Sentra Keramik Kota Malang</Eyebrow>}
        title="Kelola Toko & Pengrajin"
        description="Kelola data profil gerai UMKM, status akreditasi paguyuban, dan kontak pengrajin di lorong Dinoyo untuk memastikan keaslian karya kriya lokal."
        actions={
          <>
            <ToastButton variant="tonal" size="lg" message="Rekap direktori toko sedang disiapkan (XLSX).">
              <Download className="size-4" aria-hidden />
              Unduh Rekap
            </ToastButton>
            {user.izin.includes("toko:create") && (
              <ButtonLink href="/toko/tambah" size="lg">
                <CirclePlus className="size-5" aria-hidden />+ Tambah Toko Baru
              </ButtonLink>
            )}
          </>
        }
      />
      <TokoManager initialToko={data} ringkasan={ringkasan} />
      {/* Peta sebaran gerai per lorong + standar verifikasi paguyuban. */}
      <div className="flex flex-col gap-6">
        <LorongDistributionCard toko={data} />
        <VerificationStandardCard />
      </div>
    </>
  );
}
