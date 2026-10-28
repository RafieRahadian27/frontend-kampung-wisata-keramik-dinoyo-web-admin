import { ArrowUpRight, CloudUpload, Download, Printer, Sheet, Store, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconTile, type IconTileTone } from "@/components/ui/IconTile";

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone: IconTileTone;
  actionIcon: LucideIcon;
}

const QUICK_ACTIONS: QuickAction[] = [
  { title: "Kelola Toko Pengrajin", description: "Edit profil UMKM, foto lorong, & titik maps", href: "/toko", icon: Store, tone: "primary", actionIcon: ArrowUpRight },
  { title: "Upload Katalog Kolektif", description: "Impor batch produk massal format spreadsheet", href: "/produk", icon: CloudUpload, tone: "secondary", actionIcon: ArrowUpRight },
  { title: "Cetak Buku Direktori", description: "Format siap cetak untuk brosur wisata", href: "/toko", icon: Printer, tone: "tertiary", actionIcon: ArrowUpRight },
  { title: "Export Data Paguyuban", description: "Unduh rekap kontak & berkas pengrajin", href: "/laporan", icon: Sheet, tone: "neutral", actionIcon: Download },
];

export function QuickActions() {
  return (
    <section aria-labelledby="pintasan-title" className="flex flex-col gap-4">
      <div>
        <h2 id="pintasan-title" className="font-serif text-xl leading-7 font-semibold text-on-surface sm:text-2xl sm:leading-8">
          Pintasan Cepat CRUD &amp; Utilitas
        </h2>
        <p className="text-xs leading-[18px] text-on-surface-variant">Operasional harian kepengurusan Paguyuban Kampung Keramik</p>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {QUICK_ACTIONS.map(({ title, description, href, icon: Icon, tone, actionIcon: ActionIcon }) => (
          <li key={title}>
            <Link
              href={href}
              className="group flex h-full flex-col gap-3 rounded-2xl bg-surface-lowest p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              <div className="flex items-start justify-between">
                <IconTile tone={tone} size="md">
                  <Icon />
                </IconTile>
                <ActionIcon className="size-4 text-on-surface-variant transition group-hover:text-primary" aria-hidden />
              </div>
              <div>
                <h3 className="text-lg leading-6 font-semibold text-on-surface">{title}</h3>
                <p className="mt-1 text-[11px] leading-[17px] text-on-surface-variant">{description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
