"use client";

import { CircleCheck, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "info";

export interface ToastData {
  id: number;
  message: string;
  variant: ToastVariant;
}

const VARIANT_STYLES: Record<ToastVariant, { className: string; Icon: typeof Info }> = {
  success: { className: "bg-secondary text-on-secondary", Icon: CircleCheck },
  error: { className: "bg-error text-white dark:text-on-primary", Icon: TriangleAlert },
  info: { className: "bg-on-surface text-surface", Icon: Info },
};

export function Toast({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: number) => void }) {
  const { className, Icon } = VARIANT_STYLES[toast.variant];
  return (
    <div
      role="status"
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold shadow-float",
        "animate-[toast-in_200ms_ease-out]",
        className,
      )}
    >
      <Icon className="size-5 shrink-0" aria-hidden />
      <p className="min-w-0 flex-1">{toast.message}</p>
      <button type="button" onClick={() => onDismiss(toast.id)} aria-label="Tutup notifikasi" className="opacity-80 hover:opacity-100">
        <X className="size-4" />
      </button>
    </div>
  );
}
