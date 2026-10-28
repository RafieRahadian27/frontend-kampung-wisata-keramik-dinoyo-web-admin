"use client";

import { Pencil, Share2, Trash2 } from "lucide-react";
import type { BadgeTone } from "@/components/ui/Badge";
import { useToast } from "@/context/ToastContext";
import type { Produk, StatusProduk } from "@/types";

export const STATUS_PRODUK_TONE: Record<StatusProduk, BadgeTone> = {
  tersedia: "secondary",
  habis: "error",
  preorder: "tertiary",
};

export function produkBadgeTone(badge: string): BadgeTone {
  return badge.toLowerCase().includes("best") ? "secondary" : "tertiary";
}

interface ProdukActionsProps {
  produk: Produk;
  onShare: (produk: Produk) => void;
  onDelete: (produk: Produk) => void;
}

/** Tombol aksi manajemen produk: edit, bagikan, hapus. */
export function ProdukActions({ produk, onShare, onDelete }: ProdukActionsProps) {
  const { showToast } = useToast();
  const base = "inline-flex size-9 items-center justify-center rounded-lg transition";
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        className={`${base} bg-surface-low text-on-surface hover:bg-surface-high`}
        aria-label={`Edit ${produk.nama}`}
        title="Edit produk"
        onClick={() => showToast(`Mode edit ${produk.nama} segera tersedia.`, "info")}
      >
        <Pencil className="size-4" />
      </button>
      <button
        type="button"
        className={`${base} bg-secondary-container/60 text-secondary hover:bg-secondary-container`}
        aria-label={`Bagikan ${produk.nama}`}
        title="Bagikan"
        onClick={() => onShare(produk)}
      >
        <Share2 className="size-4" />
      </button>
      <button
        type="button"
        className={`${base} bg-error-container/60 text-error hover:bg-error-container`}
        aria-label={`Hapus ${produk.nama}`}
        title="Hapus produk"
        onClick={() => onDelete(produk)}
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
