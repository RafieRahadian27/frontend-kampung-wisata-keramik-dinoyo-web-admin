import { AdminShell } from "@/components/layout/AdminShell";
import { verifySession } from "@/lib/dal";

/**
 * Layout grup (admin) — tanda kurung membuat folder ini tidak muncul di URL.
 * Semua halaman di dalamnya berbagi Sidebar + Header yang sama.
 *
 * Pengguna diambil dari sesi yang diverifikasi server (bukan dari cookie yang bisa diubah).
 * Layout tidak dirender ulang saat navigasi antar halaman, jadi setiap page tetap
 * memanggil `requirePermission()` sendiri.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await verifySession();

  return <AdminShell user={user}>{children}</AdminShell>;
}
