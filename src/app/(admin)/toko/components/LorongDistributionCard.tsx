import { MapPinned, MapPin } from "lucide-react";
import Image from "next/image";
import { WILAYAH_LORONG } from "./form/formConfig";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Tone, Toko } from "@/types";

const TONES: Tone[] = ["primary", "secondary", "tertiary", "neutral"];

interface SebaranLorong {
  wilayah: string;
  total: number;
  terverifikasi: number;
}

/** Kelompokkan toko per wilayah lorong, mengikuti urutan pilihan di formulir toko. */
function hitungSebaran(toko: Toko[]): SebaranLorong[] {
  const urutan = [...WILAYAH_LORONG, ...toko.map((item) => item.wilayah).filter((w) => !WILAYAH_LORONG.includes(w))];
  return [...new Set(urutan)]
    .map((wilayah) => {
      const diLorong = toko.filter((item) => item.wilayah === wilayah);
      return { wilayah, total: diLorong.length, terverifikasi: diLorong.filter((item) => item.status === "terverifikasi").length };
    })
    .filter((lorong) => lorong.total > 0);
}

/** Peta sentra + jumlah gerai per lorong (dihitung dari daftar toko yang sudah diambil halaman). */
export function LorongDistributionCard({ toko }: { toko: Toko[] }) {
  const sebaran = hitungSebaran(toko);

  return (
    <Card>
      <SectionTitle
        icon={
          <IconTile tone="primary">
            <MapPinned />
          </IconTile>
        }
        title="Peta Sebaran Lorong"
        description="Persebaran gerai UMKM di setiap gang sentra keramik Dinoyo"
        aside={<span className="text-[11px] font-semibold text-on-surface-variant">{toko.length} Gerai</span>}
      />

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-surface-high lg:aspect-auto lg:min-h-64">
          <Image src="/images/peta-dinoyo.jpg" alt="Peta kawasan Kampung Wisata Keramik Dinoyo" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[#1e1b18] shadow-card">
            <MapPin className="size-3.5 text-[#9a4023]" aria-hidden />
            Kel. Dinoyo, Lowokwaru, Kota Malang
          </span>
        </div>

        {sebaran.length > 0 ? (
          <ul className="flex flex-col gap-5">
            {sebaran.map((lorong, index) => {
              const persen = Math.round((lorong.total / toko.length) * 100);
              return (
                <li key={lorong.wilayah} className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3 text-xs font-semibold">
                    <span className="min-w-0 text-on-surface">{lorong.wilayah}</span>
                    <span className="shrink-0 text-on-surface">{lorong.total} toko</span>
                  </div>
                  <ProgressBar value={persen} tone={TONES[index % TONES.length]} label={`Persentase gerai di ${lorong.wilayah}`} />
                  <p className="text-[11px] text-on-surface-variant">
                    {persen}% dari direktori • {lorong.terverifikasi} terverifikasi paguyuban
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="self-center text-sm text-on-surface-variant">Belum ada toko yang terdata di lorong mana pun.</p>
        )}
      </div>
    </Card>
  );
}
