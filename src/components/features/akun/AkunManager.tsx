"use client";

import { RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import { useToast } from "@/context/ToastContext";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { usePagination } from "@/hooks/usePagination";
import { invalidateCache } from "@/lib/actions/cache";
import { akunApi } from "@/lib/api/client";
import { CACHE_TAGS } from "@/lib/api/config";
import type { Akun, StatusAkun } from "@/types";
import { AkunStatusDialog } from "./AkunStatusDialog";
import { AkunTable } from "./AkunTable";
import { LORONG_OPTIONS, PERAN_OPTIONS, STATUS_OPTIONS } from "./akunMeta";

const PAGE_SIZE = 6;

export function AkunManager({ initialAkun, total }: { initialAkun: Akun[]; total: number }) {
  const { showToast } = useToast();
  const [akunList, setAkunList] = useState(initialAkun);
  const [keyword, setKeyword] = useState("");
  const [peran, setPeran] = useState("");
  const [status, setStatus] = useState("");
  const [lorong, setLorong] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [editing, setEditing] = useState<Akun | null>(null);
  const [isSaving, setSaving] = useState(false);

  const debouncedKeyword = useDebouncedValue(keyword).trim().toLowerCase();

  const filtered = useMemo(
    () =>
      akunList.filter((akun) => {
        const cocokKeyword =
          !debouncedKeyword || [akun.nama, akun.email, akun.nik].some((field) => field.toLowerCase().includes(debouncedKeyword));
        return cocokKeyword && (!peran || akun.peran === peran) && (!status || akun.status === status) && (!lorong || akun.lokasi.startsWith(lorong));
      }),
    [akunList, debouncedKeyword, peran, status, lorong],
  );

  const { page, setPage, totalPages, pageItems, rangeStart, rangeEnd } = usePagination(filtered, PAGE_SIZE);

  const resetFilters = () => {
    setKeyword("");
    setPeran("");
    setStatus("");
    setLorong("");
  };

  const toggleRow = (id: number) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleAll = (checked: boolean) => setSelected(checked ? new Set(pageItems.map((akun) => akun.id)) : new Set());

  const handleSaveStatus = async (akun: Akun, nextStatus: StatusAkun) => {
    setSaving(true);
    try {
      const { data, message } = await akunApi.updateStatus(akun.id, nextStatus);
      setAkunList((current) => current.map((item) => (item.id === data.id ? data : item)));
      showToast(message ?? "Status akun diperbarui");
      setEditing(null);
      await invalidateCache([CACHE_TAGS.akun]);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Gagal memperbarui akun", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <section aria-label="Filter akun" className="grid grid-cols-1 gap-3 rounded-2xl bg-surface-lowest p-4 shadow-card sm:grid-cols-2 xl:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))_auto]">
        <SearchInput value={keyword} onChange={setKeyword} placeholder="Cari nama pengrajin, email, atau NIK…" label="Cari akun" className="sm:col-span-2 xl:col-span-1" />
        <FilterSelect label="Filter peran" value={peran} options={PERAN_OPTIONS} onChange={setPeran} />
        <FilterSelect label="Filter status akun" value={status} options={STATUS_OPTIONS} onChange={setStatus} />
        <FilterSelect label="Filter afiliasi lorong" value={lorong} options={LORONG_OPTIONS} onChange={setLorong} />
        <Button variant="tonal" onClick={resetFilters} className="h-11">
          <RotateCcw className="size-4" aria-hidden />
          Reset
        </Button>
      </section>

      <section className="overflow-hidden rounded-2xl bg-surface-lowest shadow-card" aria-label="Daftar akun pengrajin">
        <AkunTable rows={pageItems} selected={selected} onToggleRow={toggleRow} onToggleAll={toggleAll} onEdit={setEditing} />
        <Pagination
          className="border-t border-outline-variant/30 px-4 py-4 sm:px-6"
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          summary={
            <>
              Menampilkan <strong className="text-on-surface">{rangeStart}–{rangeEnd}</strong> dari{" "}
              <strong className="text-on-surface">{filtered.length}</strong> Akun Pengrajin (total {total})
            </>
          }
        />
      </section>

      <AkunStatusDialog akun={editing} isSaving={isSaving} onSave={handleSaveStatus} onClose={() => setEditing(null)} />
    </>
  );
}
