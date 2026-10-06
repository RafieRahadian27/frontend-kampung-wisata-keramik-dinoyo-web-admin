import type { Metadata } from "next";
import { LoginBrandPanel } from "@/components/features/auth/LoginBrandPanel";
import { LoginForm } from "@/components/features/auth/LoginForm";

export const metadata: Metadata = {
  title: "Masuk Admin",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const nextPath = typeof params.next === "string" && params.next.startsWith("/") ? params.next : "/dashboard";
  const justLoggedOut = params.keluar === "1";

  return (
    <main className="flex min-h-dvh items-center justify-center bg-surface p-0 sm:p-6">
      <div className="grid w-full max-w-[1232px] overflow-hidden bg-surface shadow-float sm:rounded-3xl lg:min-h-[min(976px,calc(100dvh-3rem))] lg:grid-cols-2">
        <LoginBrandPanel />
        <section className="flex items-center justify-center px-4 py-10 sm:px-10 lg:p-16">
          <LoginForm nextPath={nextPath} justLoggedOut={justLoggedOut} />
        </section>
      </div>
    </main>
  );
}
