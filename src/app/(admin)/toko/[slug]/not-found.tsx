import { Store } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function TokoNotFound() {
  return (
    <Card className="mx-auto mt-6 flex max-w-lg flex-col items-center gap-4 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-primary-fixed text-primary">
        <Store className="size-7" aria-hidden />
      </span>
      <h1 className="font-serif text-2xl font-bold text-on-surface">Toko tidak ditemukan</h1>
      <p className="text-sm text-on-surface-variant">Toko mungkin sudah dihapus dari direktori atau tautannya keliru.</p>
      <ButtonLink href="/toko">Kembali ke Daftar Toko</ButtonLink>
    </Card>
  );
}
