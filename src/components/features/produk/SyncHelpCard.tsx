import { CircleHelp } from "lucide-react";
import { ToastButton } from "@/components/ui/ToastButton";
import { IconTile } from "@/components/ui/IconTile";

export function SyncHelpCard() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-secondary-container/40 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex min-w-0 items-start gap-4">
        <IconTile tone="solid-secondary">
          <CircleHelp />
        </IconTile>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-on-surface">Pusat Bantuan Sinkronisasi WhatsApp Pengrajin</h2>
          <p className="text-xs leading-[18px] text-on-surface-variant">
            Setiap karya yang diterbitkan langsung terhubung ke nomor admin koperasi atau kontak pengrajin bersangkutan.
          </p>
        </div>
      </div>
      <ToastButton variant="secondary" message="Sinkronisasi nomor WhatsApp pengrajin dijadwalkan." className="self-start sm:self-center">
        Sinkronkan Seluruh Data
      </ToastButton>
    </section>
  );
}
