"use client";

import { LayoutGrid, Rows3 } from "lucide-react";
import { useMemo, useState } from "react";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import { useToast } from "@/context/ToastContext";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { usePagination } from "@/hooks/usePagination";
import { invalidateCache } from "@/lib/actions/cache";
import { produkApi } from "@/lib/api/client";
import { CACHE_TAGS } from "@/lib/api/config";
import { cn } from "@/lib/utils";
import type { KategoriProduk, Produk } from "@/types";
import { ProdukGrid } from "./ProdukGrid";
import { ProdukTable } from "./ProdukTable";

type ViewMode = "list" | "grid";
const PAGE_SIZE = 4;

interface ProdukManagerProps {
  initialProduk: Produk[];
  kategori: KategoriProduk[];
  totalKoleksi: number;
}

export function ProdukManager({ initialProduk, kategori, totalKoleksi }: ProdukManagerProps) {
  const { showToast } = useToast();
  const [produkList, setProdukList] = useState(initialProduk);
  const [keyword, setKeyword] = useState("");
  const [toko, setToko] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("");
  const [view, setView] = useState<ViewMode>("list");
  const [deleteTarget, setDeleteTarget] = useState<Produk | null>(null);
  const [isDeleting, setDeleting] = useState(false);

  const debouncedKeyword = useDebouncedValue(keyword).trim().toLowerCase();

  const tokoOptions = useMemo(() => {
    const names = [...new Set(initialProduk.map((produk) => produk.toko.nama))];
    return [{ value: "", label: "Semua Toko Pengrajin" }, ...names.map((name) => ({ value: name, label: name }))];
  }, [initialProduk]);

  const kategoriSelectOptions = [{ value: "", label: "Semua Kategori" }, ...kategori.map((item) => ({ value: item.nama, label: item.nama }))];
  const kategoriChips = [
    { value: "", label: "Semua Kategori" },
    ...kategori.map((item) => ({ value: item.nama, label: `${item.nama} (${item.jumlah})` })),
  ];

  const filtered = useMemo(
    () =>
      produkList.filter((produk) => {
        const cocokKeyword = !debouncedKeyword || [produk.nama, produk.sku].some((field) => field.toLowerCase().includes(debouncedKeyword));
        const cocokToko = !toko || produk.toko.nama === toko;
        const cocokKategori = !kategoriAktif || produk.kategori === kategoriAktif;
        return cocokKeyword && cocokToko && cocokKategori;
      }),
    [produkList, debouncedKeyword, toko, kategoriAktif],
  );

  const { page, setPage, totalPages, pageItems, rangeStart, rangeEnd } = usePagination(filtered, PAGE_SIZE);

  const handleShare = async (produk: Produk) => {
    const text = `${produk.nama} (${produk.sku}) — Katalog Kampung Keramik Dinoyo`;
    try {
      await navigator.clipboard.writeText(text);
      showToast("Info produk disalin untuk dibagikan.", "info");
    } catch {
      showToast(text, "info");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const { message } = await produkApi.remove(deleteTarget.id);
      setProdukList((current) => current.filter((produk) => produk.id !== deleteTarget.id));
      showToast(message);
      setDeleteTarget(null);
      await invalidateCache([CACHE_TAGS.produk]);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Gagal menghapus produk", "error");
    } finally {
      setDeleting(false);
    }
  };

  const viewButton = (mode: ViewMode, label: string, Icon: typeof Rows3) => (
    <button
      type="button"
      onClick={() => setView(mode)}
      aria-pressed={view === mode}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg transition",
        view === mode ? "bg-surface-lowest text-primary shadow-card" : "text-on-surface-variant hover:text-on-surface",
      )}
    >
      <Icon className="size-[18px]" aria-hidden />
    </button>
  );

  return (
    <>
      <section aria-label="Filter produk" className="flex flex-col gap-3 rounded-2xl bg-surface-lowest p-3 shadow-card lg:flex-row lg:items-center">
        <SearchInput value={keyword} onChange={setKeyword} placeholder="Cari nama keramik, kode SKU, atau pengrajin…" label="Cari produk" className="lg:flex-[1.3]" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex-[1.6]">
          <FilterSelect label="Filter toko" value={toko} options={tokoOptions} onChange={setToko} />
          <FilterSelect label="Filter kategori" value={kategoriAktif} options={kategoriSelectOptions} onChange={setKategoriAktif} />
        </div>
        <div className="flex items-center justify-between gap-3 lg:justify-end">
          <p className="text-xs whitespace-nowrap text-on-surface-variant">
            Menampilkan <strong className="text-on-surface">{filtered.length}</strong> karya
          </p>
          <div className="flex gap-1 rounded-xl bg-surface-low p-1">
            {viewButton("list", "Tampilan tabel", Rows3)}
            {viewButton("grid", "Tampilan grid", LayoutGrid)}
          </div>
        </div>
      </section>

      <div className="scrollbar-thin -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ChipGroup label="Kategori produk" options={kategoriChips} value={kategoriAktif} onChange={setKategoriAktif} className="flex-nowrap" />
      </div>

      <section className="overflow-hidden rounded-2xl bg-surface-lowest shadow-card" aria-label="Daftar produk">
        {pageItems.length === 0 ? (
          <EmptyState title="Produk tidak ditemukan" description="Ubah kata kunci atau pilih kategori lain." />
        ) : view === "list" ? (
          <ProdukTable rows={pageItems} onShare={handleShare} onDelete={setDeleteTarget} />
        ) : (
          <ProdukGrid items={pageItems} onShare={handleShare} onDelete={setDeleteTarget} />
        )}
        <Pagination
          className="border-t border-outline-variant/30 px-4 py-4 sm:px-6"
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          summary={`Menampilkan data ${rangeStart} - ${rangeEnd} dari ${filtered.length} karya (total koleksi ${totalKoleksi})`}
        />
      </section>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Hapus produk dari katalog?"
        description={
          <>
            <strong className="text-on-surface">{deleteTarget?.nama}</strong> ({deleteTarget?.sku}) tidak akan tampil lagi di etalase publik.
          </>
        }
        confirmLabel="Ya, Hapus Produk"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </>
  );
}
