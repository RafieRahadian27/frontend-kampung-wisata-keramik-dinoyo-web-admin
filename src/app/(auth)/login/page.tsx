import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/dal";
import { safeRedirectPath } from "@/lib/session";
import { LoginBrandPanel } from "./components/LoginBrandPanel";
import { LoginForm } from "./components/LoginForm";

export const metadata: Metadata = {
  title: "Masuk Admin",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const nextPath = safeRedirectPath(params.next);

  // Sudah login dengan sesi yang masih sah → tidak perlu melihat form lagi.
  // Bila API tidak bisa dihubungi, tetap tampilkan form (pesan error muncul saat submit).
  const user = await getCurrentUser().catch(() => null);
  if (user) redirect(nextPath);

  // Kartu login dua kolom: panel brand (kiri) + formulir masuk (kanan).
  return (
    <div className="grid w-full max-w-[1232px] overflow-hidden bg-surface shadow-float sm:rounded-3xl lg:min-h-[min(976px,calc(100dvh-3rem))] lg:grid-cols-2">
      <LoginBrandPanel />
      <section className="flex items-center justify-center px-4 py-10 sm:px-10 lg:p-16">
        <LoginForm
          nextPath={nextPath}
          justLoggedOut={params.keluar === "1"}
          sessionExpired={params.sesi === "berakhir"}
          justRegistered={params.daftar === "berhasil"}
        />
      </section>
    </div>
  );
}
