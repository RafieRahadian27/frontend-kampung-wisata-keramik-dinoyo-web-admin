import type { Metadata } from "next";
import { Download, Plus } from "lucide-react";
import { Eyebrow, PageHeader } from "@/components/ui/PageHeader";
import { ToastButton } from "@/components/ui/ToastButton";
import { getProdukList } from "@/lib/api/server";
import { requirePermission } from "@/lib/dal";
import { CuratedHighlights } from "./components/CuratedHighlights";
import { ProdukManager } from "./components/ProdukManager";
import { ProdukStats } from "./components/ProdukStats";
import { SyncHelpCard } from "./components/SyncHelpCard";

export const metadata: Metadata = { title: "Kelola Produk & Katalog" };

export default async function KelolaProdukPage() {
  await requirePermission("produk:read");
  const { data, kategori, ringkasan } = await getProdukList();

  return (
    <>
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
      <CuratedHighlights produk={data} />
      <ProdukManager initialProduk={data} kategori={kategori} totalKoleksi={ringkasan.totalKoleksi} />
      <SyncHelpCard />
    </>
  );
}
