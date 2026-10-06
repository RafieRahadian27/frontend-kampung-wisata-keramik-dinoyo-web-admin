import { Compass } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-surface px-4">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <Compass className="size-8" aria-hidden />
        </span>
        <p className="text-overline text-primary">Error 404</p>
        <h1 className="font-serif text-3xl font-bold text-on-surface">Halaman tidak ditemukan</h1>
        <p className="text-sm leading-[22px] text-on-surface-variant">
          Lorong yang Anda cari tidak ada di peta Kampung Keramik Dinoyo. Periksa kembali alamatnya atau kembali ke dashboard.
        </p>
        <ButtonLink href="/dashboard">Kembali ke Dashboard</ButtonLink>
      </div>
    </main>
  );
}
