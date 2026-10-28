"use client";

import { ClipboardList, Store } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { usePagination } from "@/hooks/usePagination";
import type { LaporanData } from "@/types";

const TH = "px-2.5 py-3 text-left text-overline text-on-surface";
const PAGE_SIZE = 4;

export function ReservationHistory({ reservasi }: { reservasi: LaporanData["reservasi"] }) {
  const [keyword, setKeyword] = useState("");

  const filtered = useMemo(() => {
    const term = keyword.trim().toLowerCase();
    if (!term) return reservasi;
    return reservasi.filter((item) => [item.id, item.pemesan, item.paket].some((field) => field.toLowerCase().includes(term)));
  }, [reservasi, keyword]);

  const { page, setPage, totalPages, pageItems, rangeStart, rangeEnd } = usePagination(filtered, PAGE_SIZE);

  return (
    <Card>
      <SectionTitle
        variant="sans"
        icon={<ClipboardList className="mt-1 size-5 shrink-0 text-on-surface-variant" aria-hidden />}
        title="Riwayat Reservasi Workshop Masuk"
        description="Pembaruan daftar pemesan, studio perajin pelaksana, dan status transaksi."
      />
      <SearchInput value={keyword} onChange={setKeyword} placeholder="Cari instansi / pemesan…" label="Cari reservasi" className="mt-5 max-w-xs" />

      {pageItems.length === 0 ? (
        <EmptyState title="Reservasi tidak ditemukan" />
      ) : (
        <div className="scrollbar-thin relative mt-5 overflow-x-auto">
          <table className="w-full min-w-[540px] border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/40">
                <th className={TH}>ID Reservasi</th>
                <th className={TH}>Pemesan / Instansi</th>
                <th className={TH}>Paket Workshop</th>
                <th className={TH}>Studio Pelaksana</th>
                <th className={TH}>Jadwal Sesi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {pageItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-2.5 py-5 text-sm font-semibold whitespace-nowrap text-primary">{item.id}</td>
                  <td className="px-2.5 py-5">
                    <p className="text-sm font-semibold text-on-surface">{item.pemesan}</p>
                    <p className="text-xs text-on-surface-variant">{item.detail}</p>
                  </td>
                  <td className="px-2.5 py-5">
                    <Badge tone={item.paketTone} className="rounded-lg px-2.5 py-1 text-xs">
                      {item.paket}
                    </Badge>
                  </td>
                  <td className="px-2.5 py-5">
                    <span className="flex items-start gap-1.5 text-xs text-on-surface-variant">
                      <Store className="mt-0.5 size-3.5 shrink-0 text-tertiary" aria-hidden />
                      {item.studio}
                    </span>
                  </td>
                  <td className="px-2.5 py-5 whitespace-nowrap">
                    <p className="text-sm text-on-surface">{item.tanggal}</p>
                    <p className="text-xs text-on-surface-variant">{item.jam}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        className="mt-4 border-t border-outline-variant/30 pt-4"
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        summary={
          <>
            Menampilkan <strong className="text-on-surface">{rangeStart} – {rangeEnd}</strong> dari{" "}
            <strong className="text-on-surface">{filtered.length}</strong> reservasi bulan Oktober
          </>
        }
      />
    </Card>
  );
}
