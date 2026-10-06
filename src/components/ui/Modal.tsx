"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
  /** Strip gradasi terakota → hijau di tepi atas seperti desain dialog logout. */
  accentBar?: boolean;
}

export function Modal({ open, onClose, labelledBy, children, className, accentBar }: ModalProps) {
  // useRef: akses langsung ke elemen DOM dialog untuk fokus, tanpa render ulang.
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-scrim backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={cn(
          "relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-3xl bg-surface shadow-float outline-none",
          className,
        )}
      >
        {accentBar && <div className="h-1.5 w-full bg-linear-to-r from-primary-container via-primary to-secondary" aria-hidden />}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup dialog"
          className="absolute top-6 right-6 inline-flex size-8 items-center justify-center rounded-full text-on-surface-variant transition hover:bg-surface-container"
        >
          <X className="size-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
