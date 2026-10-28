import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/dal";
import { LoginBrandPanel } from "../login/components/LoginBrandPanel";
import { RegisterForm } from "./components/RegisterForm";

export const metadata: Metadata = {
  title: "Daftar Pengrajin",
};

export default async function DaftarPage() {
  // Sudah login → tidak perlu mendaftar lagi.
  const user = await getCurrentUser().catch(() => null);
  if (user) redirect("/");

  // Panel brand yang sama dengan halaman login (kiri) + formulir (kanan).
  // Formulir lebih panjang, jadi kolomnya diberi porsi lebih lebar (5 : 7) di layar besar.
  return (
    <div className="grid w-full max-w-[1232px] overflow-hidden bg-surface shadow-float sm:rounded-3xl lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <LoginBrandPanel />
      <section className="flex items-start justify-center px-4 py-8 sm:px-10 sm:py-10 lg:p-12">
        <RegisterForm />
      </section>
    </div>
  );
}
