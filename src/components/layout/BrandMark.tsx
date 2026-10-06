import { cn } from "@/lib/utils";

interface BrandMarkProps {
  variant?: "panel" | "login";
  className?: string;
}

/** Logo "KD" + nama brand. Varian `login` dipakai di panel terakota halaman login. */
export function BrandMark({ variant = "panel", className }: BrandMarkProps) {
  if (variant === "login") {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-base font-bold text-brand shadow-card">
          KD
        </span>
        <span className="min-w-0">
          <span className="block text-base leading-6 font-semibold text-white">Kampung Wisata Keramik Dinoyo</span>
          <span className="block text-sm leading-5 tracking-[0.12em] text-brand-tint uppercase">Sentra Pengrajin Malang</span>
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary font-serif text-xl font-semibold text-on-primary shadow-primary dark:bg-primary-container dark:text-on-primary-container">
        KD
      </span>
      <span className="min-w-0">
        <span className="block text-xl leading-7 font-semibold text-on-surface">Dinoyo Craft</span>
        <span className="block text-overline text-primary">Panel Pengelolaan</span>
      </span>
    </div>
  );
}
