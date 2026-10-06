import { Download, Landmark, CirclePlus } from "lucide-react";
import type { Metadata } from "next";
import { TokoManager } from "@/components/features/toko/TokoManager";
import { TokoStats } from "@/components/features/toko/TokoStats";
import { VerificationStandardCard } from "@/components/features/toko/VerificationStandardCard";
import { ButtonLink } from "@/components/ui/Button";
import { ToastButton } from "@/components/ui/ToastButton";
import { Eyebrow, PageHeader } from "@/components/ui/PageHeader";
import { getTokoList } from "@/lib/api/server";

export const metadata: Metadata = { title: "Kelola Toko & Pengrajin" };

export default async function KelolaTokoPage() {
  const { data, ringkasan } = await getTokoList();

  return (
    <div className="flex flex-col gap-8">
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
            <ButtonLink href="/toko/tambah" size="lg">
              <CirclePlus className="size-5" aria-hidden />+ Tambah Toko Baru
            </ButtonLink>
          </>
        }
      />

      <TokoManager initialToko={data} ringkasan={ringkasan} />

      <VerificationStandardCard />
    </div>
  );
}
