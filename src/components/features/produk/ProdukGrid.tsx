"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { formatRupiah } from "@/lib/utils";
import type { Produk } from "@/types";
import { ProdukActions, STATUS_PRODUK_TONE, produkBadgeTone } from "./produkMeta";

interface ProdukGridProps {
  items: Produk[];
  onShare: (produk: Produk) => void;
  onDelete: (produk: Produk) => void;
}

/** Tampilan galeri kartu — alternatif tampilan tabel (toggle di bar filter). */
export function ProdukGrid({ items, onShare, onDelete }: ProdukGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
      {items.map((produk) => (
        <li key={produk.id} className="flex flex-col overflow-hidden rounded-2xl bg-surface-low">
          <div className="relative aspect-square w-full bg-surface-high">
            <Image src={produk.foto} alt={produk.nama} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            {produk.badge && (
              <Badge tone={produkBadgeTone(produk.badge)} uppercase className="absolute top-3 left-3 text-[10px]">
                {produk.badge}
              </Badge>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <p className="font-semibold text-on-surface">{produk.nama}</p>
            <p className="text-[11px] text-on-surface-variant">
              {produk.sku} • {produk.toko.nama}
            </p>
            <Badge tone={STATUS_PRODUK_TONE[produk.status]} dot className="w-fit">
              {produk.stokLabel}
            </Badge>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
              <p className="font-semibold text-on-surface">{formatRupiah(produk.harga)}</p>
              <ProdukActions produk={produk} onShare={onShare} onDelete={onDelete} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
