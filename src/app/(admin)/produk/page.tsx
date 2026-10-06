import type { Metadata } from "next";
import { Download, Plus } from "lucide-react";
import { ProdukManager } from "@/components/features/produk/ProdukManager";
import { ProdukStats } from "@/components/features/produk/ProdukStats";
import { SyncHelpCard } from "@/components/features/produk/SyncHelpCard";
import { Eyebrow, PageHeader } from "@/components/ui/PageHeader";
import { ToastButton } from "@/components/ui/ToastButton";
import { getProdukList } from "@/lib/api/server";

export const metadata: Metadata = { title: "Kelola Produk & Katalog" };

export default async function KelolaProdukPage() {
  const { data, kategori, ringkasan } = await getProdukList();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow={<Eyebrow>Katalog Resmi Paguyuban Dinoyo</Eyebrow>}
        title="Kelola Produk & Katalog Kriya"
        description="Inventaris karya keramik, cangkir, vas, guci, dan suvenir otentik dari seluruh studio pengrajin Dinoyo Kota Malang."
        actions={
          <>
            <ToastButton size="lg" message="Formulir produk baru sedang disiapkan oleh tim paguyuban.">
              <Plus className="size-5" aria-hidden />+ Tambah Produk Baru
            </ToastButton>
            <ToastButton variant="tonal" size="lg" message="Rekap katalog sedang diekspor ke format XLSX.">
              <Download className="size-4" aria-hidden />
              Ekspor Rekap
            </ToastButton>
          </>
        }
      />
      <ProdukStats ringkasan={ringkasan} />
      <ProdukManager initialProduk={data} kategori={kategori} totalKoleksi={ringkasan.totalKoleksi} />
      <SyncHelpCard />
    </div>
  );
}
