"use client";

import { Info, LogOut, Power, Sprout } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useAdminShell } from "@/context/AdminShellContext";
import { destroySession } from "@/lib/actions/session";
import { authApi } from "@/lib/api/client";

const TITLE_ID = "logout-dialog-title";

export function LogoutDialog() {
  const { user, isLogoutOpen, closeLogout } = useAdminShell();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      // Beritahu backend (abaikan bila offline), lalu hapus cookie sesi & redirect ke /login.
      await authApi.logout().catch(() => undefined);
      await destroySession();
    });
  };

  return (
    <Modal open={isLogoutOpen} onClose={closeLogout} labelledBy={TITLE_ID} accentBar>
      <div className="flex flex-col items-center gap-5 px-6 pt-8 pb-6 text-center sm:px-8">
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-primary-fixed ring-8 ring-primary-fixed/40">
          <LogOut className="size-7 text-primary" aria-hidden />
        </span>
        <h2 id={TITLE_ID} className="font-serif text-xl leading-7 font-bold text-on-surface sm:text-2xl sm:leading-8">
          Konfirmasi Keluar dari Panel Admin?
        </h2>
        <p className="text-sm leading-[23px] text-on-surface-variant">
          Anda akan keluar dari sesi pengelolaan <strong className="font-semibold text-on-surface">Kampung Wisata Keramik Dinoyo</strong>{" "}
          sebagai <strong className="font-semibold text-on-surface">{user.nama}</strong> (
          <span className="text-primary">{user.email}</span>). Pastikan seluruh pembaruan kurasi toko, inventaris gerabah, dan data
          pengrajin telah tersimpan.
        </p>

        <div className="flex w-full items-start gap-3 rounded-xl bg-surface-container px-4 py-3 text-left text-xs leading-[18px] text-on-surface-variant">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>
            Sesi Anda akan ditutup dan Anda akan dialihkan kembali ke{" "}
            <strong className="font-semibold text-on-surface">Halaman Login Pengrajin &amp; Admin</strong>.
          </p>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-2">
          <Button variant="tonal" size="lg" onClick={closeLogout} disabled={isPending}>
            Batal, Tetap di Sini
          </Button>
          <Button variant="primary" size="lg" onClick={handleLogout} isLoading={isPending}>
            {!isPending && <Power className="size-4" aria-hidden />}
            Ya, Keluar Sekarang
          </Button>
        </div>

        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-on-surface-variant">
          <Sprout className="size-3.5" aria-hidden />
          Kampung Wisata Keramik Dinoyo • Kota Malang
        </p>
      </div>
    </Modal>
  );
}
