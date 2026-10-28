import { KeyRound, LogIn, ShieldAlert, ShieldCheck, UserRoundCog, type LucideIcon } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { inisial } from "@/lib/utils";
import type { JenisRiwayatAkun, RiwayatAkun } from "@/types";

const JENIS_META: Record<JenisRiwayatAkun, { label: string; tone: BadgeTone; icon: LucideIcon }> = {
  login: { label: "Login", tone: "secondary", icon: LogIn },
  gagal: { label: "Ditolak", tone: "error-soft", icon: ShieldAlert },
  status: { label: "Status", tone: "tertiary", icon: UserRoundCog },
  sandi: { label: "Kata Sandi", tone: "primary", icon: KeyRound },
};

/** Log keamanan akun: login, login ditolak, perubahan status, dan reset kata sandi. */
export function AccountActivityLog({ riwayat }: { riwayat: RiwayatAkun[] }) {
  return (
    <Card padding="none">
      <SectionTitle
        className="p-4 sm:p-6"
        icon={
          <IconTile tone="secondary">
            <ShieldCheck />
          </IconTile>
        }
        title="Riwayat Aktivitas Akun"
        description="Jejak login dan perubahan hak akses pengrajin 7 hari terakhir"
      />
      <ul className="divide-y divide-outline-variant/30 border-t border-outline-variant/30">
        {riwayat.map((item) => {
          const { label, tone, icon: Icon } = JENIS_META[item.jenis];
          return (
            <li key={item.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Avatar name={item.akun} initials={inisial(item.akun)} tone="neutral" size="sm" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-on-surface">{item.akun}</p>
                  <p className="truncate text-[11px] text-on-surface-variant">{item.toko}</p>
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <Badge tone={tone} icon={<Icon className="size-3" aria-hidden />} className="w-fit">
                  {label}
                </Badge>
                <p className="text-xs leading-[18px] text-on-surface">{item.keterangan}</p>
              </div>
              <div className="flex shrink-0 justify-between gap-3 text-[11px] text-on-surface-variant sm:w-44 sm:flex-col sm:items-end sm:gap-0.5">
                <time className="font-semibold text-on-surface">{item.waktu}</time>
                <span>{item.perangkat}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
