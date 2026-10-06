"use client";

import { Trash2 } from "lucide-react";
import { Button } from "./Button";
import { Modal } from "./Modal";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: React.ReactNode;
  confirmLabel: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const TITLE_ID = "confirm-dialog-title";

/** Dialog konfirmasi aksi berisiko (hapus data) — mengikuti overlay "Konfirmasi Hapus" di Figma. */
export function ConfirmDialog({ open, title, description, confirmLabel, isLoading, onConfirm, onClose }: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} labelledBy={TITLE_ID} className="max-w-md">
      <div className="flex flex-col items-center gap-4 px-6 pt-8 pb-6 text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-error-container text-error">
          <Trash2 className="size-6" aria-hidden />
        </span>
        <h2 id={TITLE_ID} className="font-serif text-xl leading-7 font-bold text-on-surface">
          {title}
        </h2>
        <div className="text-sm leading-[22px] text-on-surface-variant">{description}</div>
        <div className="mt-2 grid w-full gap-3 sm:grid-cols-2">
          <Button variant="tonal" size="lg" onClick={onClose} disabled={isLoading}>
            Batal
          </Button>
          <Button variant="danger" size="lg" onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
