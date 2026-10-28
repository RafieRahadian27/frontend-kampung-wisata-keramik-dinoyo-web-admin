import { ArrowRight, BadgeCheck, CalendarCheck, History, Palette, Store, UserCog, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { IconTile, type IconTileTone } from "@/components/ui/IconTile";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Aktivitas, JenisAktivitas } from "@/types";

const JENIS_META: Record<JenisAktivitas, { icon: LucideIcon; tone: IconTileTone; label: string }> = {
  toko: { icon: Store, tone: "primary", label: "Toko" },
  produk: { icon: Palette, tone: "secondary", label: "Produk" },
  akun: { icon: UserCog, tone: "neutral", label: "Akun" },
  verifikasi: { icon: BadgeCheck, tone: "tertiary", label: "Verifikasi" },
  reservasi: { icon: CalendarCheck, tone: "secondary", label: "Reservasi" },
};

/** Linimasa perubahan data terbaru di seluruh paguyuban (toko, produk, akun, reservasi). */
export function RecentActivityCard({ aktivitas }: { aktivitas: Aktivitas[] }) {
  return (
    <Card>
      <SectionTitle
        icon={
          <IconTile tone="neutral" size="md">
            <History />
          </IconTile>
        }
        title="Aktivitas Terbaru"
        description="Catatan perubahan data toko, katalog, dan akun pengrajin hari ini"
        aside={
          <Link href="/laporan" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
            Lihat Laporan
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        }
      />
      <ol className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {aktivitas.map((item) => {
          const { icon: Icon, tone, label } = JENIS_META[item.jenis];
          return (
            <li key={item.id} className="flex items-start gap-3 rounded-xl bg-surface-low p-3 sm:p-4">
              <IconTile tone={tone} size="sm" rounded="full">
                <Icon />
              </IconTile>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-5 font-semibold text-on-surface">{item.judul}</p>
                <p className="mt-0.5 text-[11px] leading-[17px] text-on-surface-variant">{item.detail}</p>
                <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[11px] text-on-surface-variant">
                  <span className="font-semibold text-on-surface">{item.pelaku}</span>
                  <span aria-hidden>•</span>
                  <time>{item.waktu}</time>
                  <span className="sr-only">Jenis: {label}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
