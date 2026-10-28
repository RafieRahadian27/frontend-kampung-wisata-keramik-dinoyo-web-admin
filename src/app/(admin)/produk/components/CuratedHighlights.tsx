import { Sparkles } from "lucide-react";
import Image from "next/image";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/IconTile";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { formatRupiah } from "@/lib/utils";
import type { Produk } from "@/types";
import { produkBadgeTone } from "./produkMeta";

const JUMLAH_SOROTAN = 3;

/** Karya berlabel (Best Seller, Koleksi Maestro, ...) didahulukan, sisanya diisi produk tersedia. */
function pilihSorotan(produk: Produk[]): Produk[] {
  const berlabel = produk.filter((item) => item.badge);
  const lainnya = produk.filter((item) => !item.badge && item.status !== "habis");
  return [...berlabel, ...lainnya].slice(0, JUMLAH_SOROTAN);
}

export function CuratedHighlights({ produk }: { produk: Produk[] }) {
  const sorotan = pilihSorotan(produk);
  if (sorotan.length === 0) return null;

  return (
    <section aria-labelledby="sorotan-title" className="flex flex-col gap-4">
      <SectionTitle
        icon={
          <IconTile tone="tertiary">
            <Sparkles />
          </IconTile>
        }
        title={<span id="sorotan-title">Sorotan Kurasi Bulan Ini</span>}
        description="Karya unggulan pilihan kurator paguyuban yang tampil di beranda portal wisata"
      />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {sorotan.map((item) => (
          <li key={item.id} className="group flex flex-col overflow-hidden rounded-2xl bg-surface-lowest shadow-card">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-high">
              <Image
                src={item.foto}
                alt={item.nama}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              {item.badge && (
                <Badge tone={produkBadgeTone(item.badge)} uppercase className="absolute top-3 left-3 text-[10px]">
                  {item.badge}
                </Badge>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div>
                <p className="font-serif text-lg leading-6 font-semibold text-on-surface">{item.nama}</p>
                <p className="mt-1 text-[11px] leading-[17px] text-on-surface-variant">
                  {item.teknik} • {item.bahan}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-outline-variant/30 pt-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Avatar name={item.toko.nama} initials={item.toko.inisial} size="xs" />
                  <span className="truncate text-xs font-semibold text-on-surface">{item.toko.nama}</span>
                </div>
                <span className="shrink-0 text-sm font-semibold text-primary">{formatRupiah(item.harga)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
