"use client";

import { useMemo, useState } from "react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Pagination } from "@/components/ui/Pagination";
import { useToast } from "@/context/ToastContext";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { usePagination } from "@/hooks/usePagination";
import { invalidateCache } from "@/lib/actions/cache";
import { tokoApi } from "@/lib/api/client";
import { CACHE_TAGS } from "@/lib/api/config";
import type { RingkasanToko, StatusToko, Toko } from "@/types";
import { TokoFilterBar, type TokoFilters } from "./TokoFilterBar";
import { TokoTable } from "./TokoTable";

const PAGE_SIZE = 6;
const INITIAL_FILTERS: TokoFilters = { keyword: "", lokasi: "", kategori: "", status: "semua" };

/**
 * Parent untuk halaman Kelola Toko: menyimpan state filter, pilihan baris,
 * dan daftar toko; lalu meneruskannya ke FilterBar & Table lewat props.
 */
export function TokoManager({ initialToko, ringkasan }: { initialToko: Toko[]; ringkasan: RingkasanToko }) {
  const { showToast } = useToast();
  const [tokoList, setTokoList] = useState(initialToko);
  const [filters, setFilters] = useState<TokoFilters>(INITIAL_FILTERS);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<Toko | null>(null);
  const [isDeleting, setDeleting] = useState(false);

  const keyword = useDebouncedValue(filters.keyword).trim().toLowerCase();

  const filtered = useMemo(
    () =>
      tokoList.filter((toko) => {
        const cocokKeyword = !keyword || [toko.nama, toko.pemilik, toko.nib].some((field) => field.toLowerCase().includes(keyword));
        const cocokLokasi = !filters.lokasi || toko.lokasiGang.startsWith(filters.lokasi);
        const cocokKategori = !filters.kategori || toko.spesialisasi === filters.kategori;
        const cocokStatus = filters.status === "semua" || toko.status === filters.status;
        return cocokKeyword && cocokLokasi && cocokKategori && cocokStatus;
      }),
    [tokoList, keyword, filters.lokasi, filters.kategori, filters.status],
  );

  const { page, setPage, totalPages, pageItems, rangeStart, rangeEnd } = usePagination(filtered, PAGE_SIZE);

  const statusCounts = useMemo(() => {
    const count = (status: StatusToko) => tokoList.filter((toko) => toko.status === status).length;
    return { semua: tokoList.length, terverifikasi: count("terverifikasi"), menunggu: count("menunggu"), nonaktif: count("nonaktif") };
  }, [tokoList]);

  const toggleRow = (slug: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? new Set(pageItems.map((toko) => toko.slug)) : new Set());
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const { message } = await tokoApi.remove(deleteTarget.slug);
      setTokoList((current) => current.filter((toko) => toko.slug !== deleteTarget.slug));
      setSelected((current) => {
        const next = new Set(current);
        next.delete(deleteTarget.slug);
        return next;
      });
      showToast(message);
      setDeleteTarget(null);
      await invalidateCache([CACHE_TAGS.toko, CACHE_TAGS.dashboard]);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Gagal menghapus toko", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <TokoFilterBar
        filters={filters}
        statusCounts={statusCounts}
        onChange={(patch) => setFilters((current) => ({ ...current, ...patch }))}
        onReset={() => setFilters(INITIAL_FILTERS)}
      />

      <section className="overflow-hidden rounded-2xl bg-surface-lowest shadow-card" aria-label="Daftar toko pengrajin">
        <TokoTable
          rows={pageItems}
          selected={selected}
          onToggleRow={toggleRow}
          onToggleAll={toggleAll}
          onDelete={setDeleteTarget}
        />
        <Pagination
          className="border-t border-outline-variant/30 bg-surface-low px-4 py-4 sm:px-6"
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          summary={
            <>
              Menampilkan <strong className="text-on-surface">{rangeStart}–{rangeEnd}</strong> dari{" "}
              <strong className="text-on-surface">{filtered.length}</strong> toko (total direktori {ringkasan.total} gerai)
              {selected.size > 0 && ` • ${selected.size} dipilih`}
            </>
          }
        />
      </section>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Hapus toko dari direktori?"
        description={
          <>
            Data <strong className="text-on-surface">{deleteTarget?.nama}</strong> beserta katalog produknya akan dihapus dari direktori
            paguyuban. Tindakan ini tidak dapat dibatalkan.
          </>
        }
        confirmLabel="Ya, Hapus Toko"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </>
  );
}
