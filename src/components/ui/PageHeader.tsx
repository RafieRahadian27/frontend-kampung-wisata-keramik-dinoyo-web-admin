import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

/** Judul halaman (Playfair Display) + deskripsi + tombol aksi utama. */
export function PageHeader({ eyebrow, title, description, actions, className }: PageHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between", className)}>
      <div className="flex min-w-0 flex-col gap-2">
        {eyebrow}
        <h1 className="font-serif text-[28px] leading-9 font-bold tracking-[-0.02em] text-on-surface sm:text-[40px] sm:leading-[48px]">
          {title}
        </h1>
        {description && <p className="max-w-2xl text-sm leading-[22px] text-on-surface-variant">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3 lg:shrink-0 lg:flex-nowrap">{actions}</div>}
    </header>
  );
}

/** Label kecil di atas judul halaman, misalnya "• KATALOG RESMI PAGUYUBAN DINOYO". */
export function Eyebrow({ icon, children, tone = "primary" }: { icon?: ReactNode; children: ReactNode; tone?: "primary" | "secondary" }) {
  if (tone === "secondary") {
    return (
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary-container px-3 py-1 text-overline text-secondary-text">
        {icon ?? <span className="size-1.5 rounded-full bg-secondary" aria-hidden />}
        {children}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 text-overline text-primary [&_svg]:size-4">
      {icon ?? <span className="size-2 rounded-full bg-primary" aria-hidden />}
      {children}
    </span>
  );
}
