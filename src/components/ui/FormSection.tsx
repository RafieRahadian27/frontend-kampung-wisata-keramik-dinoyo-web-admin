import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description: string;
  icon: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Kartu bagian formulir: ikon kotak + judul serif + deskripsi, lalu isi field. */
export function FormSection({ title, description, icon, aside, children, className }: FormSectionProps) {
  return (
    <section className={cn("relative flex flex-col gap-6 overflow-hidden rounded-2xl bg-surface-lowest p-5 shadow-card sm:p-8", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-4">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-container text-primary [&_svg]:size-5" aria-hidden>
            {icon}
          </span>
          <div className="min-w-0">
            <h2 className="font-serif text-xl leading-7 font-semibold text-on-surface sm:text-2xl sm:leading-8">{title}</h2>
            <p className="text-xs leading-[18px] text-on-surface-variant">{description}</p>
          </div>
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}
