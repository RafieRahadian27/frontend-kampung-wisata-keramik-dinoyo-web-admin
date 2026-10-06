import { CalendarDays, CirclePlus, Warehouse } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import type { AdminUser } from "@/types";

interface DashboardGreetingProps {
  admin: AdminUser;
  tanggal: string;
}

export function DashboardGreeting({ admin, tanggal }: DashboardGreetingProps) {
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-secondary-container px-3 py-1 text-overline text-secondary-text">
            Role: {admin.peran}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant">
            <CalendarDays className="size-3.5" aria-hidden />
            {tanggal}
          </span>
        </div>
        <h1 className="font-serif text-[26px] leading-9 font-semibold text-on-surface sm:text-[32px] sm:leading-10">
          Selamat datang, {admin.sapaan} <span aria-hidden>👋</span>
        </h1>
        <p className="max-w-xl text-sm leading-[22px] text-on-surface-variant">
          Pantau kelangsungan ekosistem UMKM pengrajin keramik Kampung Dinoyo, verifikasi studio baru, dan pantau arus reservasi
          workshop hari ini.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/toko/tambah" variant="tonal">
          <Warehouse className="size-4" aria-hidden />+ Tambah Toko
        </ButtonLink>
        <ButtonLink href="/produk" variant="primary" className="px-5">
          <CirclePlus className="size-4" aria-hidden />+ Tambah Produk
        </ButtonLink>
      </div>
    </header>
  );
}
