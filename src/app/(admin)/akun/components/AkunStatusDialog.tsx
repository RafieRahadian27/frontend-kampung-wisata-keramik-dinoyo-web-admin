"use client";

import { useState, type FormEvent } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import type { Akun, StatusAkun } from "@/types";
import { STATUS_AKUN } from "./akunMeta";

interface AkunStatusDialogProps {
  akun: Akun | null;
  isSaving: boolean;
  onSave: (akun: Akun, status: StatusAkun) => void;
  onClose: () => void;
}

const TITLE_ID = "akun-status-title";
const STATUS_LIST = Object.keys(STATUS_AKUN) as StatusAkun[];

export function AkunStatusDialog({ akun, isSaving, onSave, onClose }: AkunStatusDialogProps) {
  return (
    <Modal open={akun !== null} onClose={onClose} labelledBy={TITLE_ID} className="max-w-md">
      {/* key memastikan state form di-reset setiap kali akun yang diedit berganti. */}
      {akun && <StatusForm key={akun.id} akun={akun} isSaving={isSaving} onSave={onSave} onClose={onClose} />}
    </Modal>
  );
}

function StatusForm({ akun, isSaving, onSave, onClose }: Omit<AkunStatusDialogProps, "akun"> & { akun: Akun }) {
  const [status, setStatus] = useState<StatusAkun>(akun.status);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(akun, status);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 sm:p-8">
      <div className="flex items-center gap-3 pr-10">
        <Avatar name={akun.nama} initials={akun.inisial} tone={akun.tone} size="lg" />
        <div className="min-w-0">
          <h2 id={TITLE_ID} className="font-serif text-xl font-bold text-on-surface">
            Ubah Status Akun
          </h2>
          <p className="truncate text-sm text-on-surface-variant">{akun.nama}</p>
        </div>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-xs font-semibold text-on-surface">Status keaktifan di paguyuban</legend>
        {STATUS_LIST.map((value) => (
          <label
            key={value}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition",
              status === value ? "border-primary bg-primary-fixed/30 text-on-surface" : "border-outline-variant/50 text-on-surface-variant hover:bg-surface-low",
            )}
          >
            <input
              type="radio"
              name="status"
              value={value}
              checked={status === value}
              onChange={() => setStatus(value)}
              className="size-4 accent-primary"
            />
            {STATUS_AKUN[value].label}
          </label>
        ))}
      </fieldset>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button variant="tonal" size="lg" onClick={onClose} disabled={isSaving}>
          Batal
        </Button>
        <Button type="submit" size="lg" isLoading={isSaving} disabled={status === akun.status}>
          Simpan Status
        </Button>
      </div>
    </form>
  );
}
