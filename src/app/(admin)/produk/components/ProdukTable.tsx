"use client";

import Image from "next/image";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { cn, formatRupiah } from "@/lib/utils";
import type { Produk } from "@/types";
import { ProdukActions, STATUS_PRODUK_TONE, produkBadgeTone } from "./produkMeta";

interface ProdukTableProps {
  rows: Produk[];
  onShare: (produk: Produk) => void;
  onDelete: (produk: Produk) => void;
}

const TH = "px-3 py-4 text-left text-overline text-on-surface-variant";

function ProdukIdentity({ produk }: { produk: Produk }) {
  return (
    <div className="flex min-w-0 items-center gap-4">
      <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-surface-high">
        <Image src={produk.foto} alt={produk.nama} fill sizes="64px" className="object-cover" />
      </span>
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-2 text-base leading-6 font-medium text-on-surface sm:text-lg">
          {produk.nama}
          {produk.badge && (
            <Badge tone={produkBadgeTone(produk.badge)} uppercase className="text-[10px]">
              {produk.badge}
            </Badge>
          )}
        </p>
        <p className="text-xs text-on-surface-variant">
          SKU: {produk.sku} • {produk.teknik}
        </p>
      </div>
    </div>
  );
}

export function ProdukTable({ rows, onShare, onDelete }: ProdukTableProps) {
  return (
    <>
      <div className="scrollbar-thin relative hidden overflow-x-auto md:block">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="bg-surface-low">
            <tr>
              <th className={cn(TH, "pl-5")}>Produk &amp; Foto</th>
              <th className={TH}>Toko Pengrajin</th>
              <th className={TH}>Kategori &amp; Bahan</th>
              <th className={TH}>Harga UMKM</th>
              <th className={TH}>Status &amp; Stok</th>
              <th className={cn(TH, "pr-5")}>Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {rows.map((produk) => (
              <tr key={produk.id} className="transition hover:bg-surface-low/60">
                <td className="max-w-[280px] py-5 pr-3 pl-5">
                  <ProdukIdentity produk={produk} />
                </td>
                <td className="px-3 py-5">
                  <div className="flex items-center gap-2">
                    <Avatar name={produk.toko.nama} initials={produk.toko.inisial} size="xs" tone="primary" />
                    <div>
                      <p className="text-xs font-semibold text-on-surface">{produk.toko.nama}</p>
                      <p className="text-[11px] text-on-surface-variant">{produk.toko.pengrajin}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-5">
                  <Badge tone="surface" className="rounded-md">
                    {produk.kategori}
                  </Badge>
                  <p className="mt-1.5 text-xs text-on-surface-variant">{produk.bahan}</p>
                </td>
                <td className="px-3 py-5 whitespace-nowrap">
                  <p className="text-base font-semibold text-on-surface">{formatRupiah(produk.harga)}</p>
                  <p className="text-[11px] font-semibold text-secondary">{produk.catatanHarga}</p>
                </td>
                <td className="px-3 py-5">
                  <Badge tone={STATUS_PRODUK_TONE[produk.status]} dot className="whitespace-nowrap">
                    {produk.stokLabel}
                  </Badge>
                  <p className="mt-1.5 text-[11px] font-semibold text-on-surface-variant">{produk.lokasiStok}</p>
                </td>
                <td className="py-5 pr-5 pl-3">
                  <ProdukActions produk={produk} onShare={onShare} onDelete={onDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-outline-variant/30 md:hidden">
        {rows.map((produk) => (
          <li key={produk.id} className="flex flex-col gap-3 p-4">
            <ProdukIdentity produk={produk} />
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={STATUS_PRODUK_TONE[produk.status]} dot>
                {produk.stokLabel}
              </Badge>
              <Badge tone="surface">{produk.kategori}</Badge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-on-surface">{formatRupiah(produk.harga)}</p>
                <p className="text-[11px] text-on-surface-variant">{produk.toko.nama}</p>
              </div>
              <ProdukActions produk={produk} onShare={onShare} onDelete={onDelete} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
