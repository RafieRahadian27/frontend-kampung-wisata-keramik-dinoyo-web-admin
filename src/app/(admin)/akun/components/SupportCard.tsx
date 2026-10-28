import { Headset } from "lucide-react";
import { ToastButton } from "@/components/ui/ToastButton";
import { IconTile } from "@/components/ui/IconTile";

export function SupportCard() {
  return (
    <section className="flex flex-col gap-5 rounded-2xl bg-secondary-container/40 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex min-w-0 items-start gap-4">
        <IconTile tone="solid-secondary" size="lg">
          <Headset />
        </IconTile>
        <div className="min-w-0">
          <h2 className="text-xl leading-7 font-semibold text-on-surface">Pusat Bantuan Akses &amp; Verifikasi Pengrajin</h2>
          <p className="mt-1 max-w-2xl text-sm leading-[22px] text-on-surface-variant">
            Hubungi tim sekretariat paguyuban jika pengrajin kesulitan login, lupa nomor WhatsApp pemulihan, atau memerlukan penggantian
            kepemilikan toko keramik.
          </p>
        </div>
      </div>
      <ToastButton variant="secondary" message="Sekretariat Paguyuban: +62 341-555-0123 (Senin–Jumat)." size="lg" className="self-start sm:self-center">
        Hubungi Sekretariat Dinoyo
      </ToastButton>
    </section>
  );
}
