/** Tata letak halaman: kartu autentikasi di tengah layar. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="flex min-h-dvh items-center justify-center bg-surface p-0 sm:p-6">{children}</main>;
}
