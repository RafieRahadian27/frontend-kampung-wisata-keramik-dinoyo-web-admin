import { ListChecks, ShieldCheck } from "lucide-react";
import { ToastButton } from "@/components/ui/ToastButton";
import { IconTile } from "@/components/ui/IconTile";

export function VerificationStandardCard() {
  return (
    <section className="flex flex-col gap-5 rounded-2xl bg-surface-container p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex min-w-0 items-start gap-4">
        <IconTile tone="solid-primary" size="lg">
          <ShieldCheck />
        </IconTile>
        <div className="min-w-0">
          <h2 className="text-xl leading-7 font-semibold text-on-surface sm:text-[22px]">Standar Verifikasi Paguyuban Dinoyo</h2>
          <p className="mt-1 max-w-md text-xs leading-[18px] text-on-surface-variant">
            Gerai berstatus &lsquo;Terverifikasi&rsquo; berhak menerima pemesanan publik, workshop wisatawan terpadu, dan etalase digital resmi
            dinas pariwisata.
          </p>
        </div>
      </div>
      <ToastButton variant="outline" message="Kriteria kurasi: legalitas NIB, keaslian karya, dan kunjungan studio." className="self-start sm:self-center">
        <ListChecks className="size-4" aria-hidden />
        Kriteria Kurasi Dinoyo
      </ToastButton>
    </section>
  );
}
