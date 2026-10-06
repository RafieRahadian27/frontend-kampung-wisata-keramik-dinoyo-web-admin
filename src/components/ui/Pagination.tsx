"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  summary: React.ReactNode;
  className?: string;
}

/** Membuat daftar nomor halaman dengan elipsis: 1 2 3 … 12 */
function buildPages(page: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1);
  const pages = new Set([1, 2, 3, page, totalPages].filter((p) => p >= 1 && p <= totalPages));
  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((current, index) =>
    index > 0 && current - sorted[index - 1] > 1 ? (["ellipsis", current] as const) : [current],
  );
}

export function Pagination({ page, totalPages, onPageChange, summary, className }: PaginationProps) {
  const pages = buildPages(page, Math.max(1, totalPages));
  const navButton =
    "inline-flex size-9 items-center justify-center rounded-lg bg-surface-lowest text-on-surface-variant transition hover:bg-surface-high disabled:opacity-40";

  return (
    <nav
      aria-label="Navigasi halaman"
      className={cn("flex flex-col items-center justify-between gap-3 sm:flex-row", className)}
    >
      <p className="text-xs leading-[18px] text-on-surface-variant">{summary}</p>
      <div className="flex items-center gap-1.5">
        <button type="button" className={navButton} onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="Halaman sebelumnya">
          <ChevronLeft className="size-4" />
        </button>
        {pages.map((item, index) =>
          item === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="px-1 text-xs text-on-surface-variant">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-current={item === page ? "page" : undefined}
              className={cn(
                "inline-flex size-9 items-center justify-center rounded-lg text-xs font-semibold transition",
                item === page ? "bg-primary text-on-primary shadow-primary" : "text-on-surface-variant hover:bg-surface-high",
              )}
            >
              {item}
            </button>
          ),
        )}
        <button type="button" className={navButton} onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} aria-label="Halaman berikutnya">
          <ChevronRight className="size-4" />
        </button>
      </div>
    </nav>
  );
}
