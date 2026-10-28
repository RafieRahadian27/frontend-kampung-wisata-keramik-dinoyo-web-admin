import { ShieldAlert } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

/** Ditampilkan saat `forbidden()` dipanggil: sudah login, tetapi tidak punya izin (HTTP 403). */
export default function Forbidden() {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-error-container text-error">
          <ShieldAlert className="size-8" aria-hidden />
        </span>
        <p className="text-overline text-error">Error 403</p>
        <h1 className="font-serif text-3xl font-bold text-on-surface">Akses tidak diizinkan</h1>
        <p className="text-sm leading-[22px] text-on-surface-variant">
          Peran akun Anda tidak memiliki izin untuk membuka halaman ini. Hubungi admin paguyuban bila Anda membutuhkan akses.
        </p>
        <ButtonLink href="/">Kembali ke Beranda</ButtonLink>
      </div>
    </div>
  );
}
