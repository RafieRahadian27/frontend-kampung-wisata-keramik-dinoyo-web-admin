import { cookies } from "next/headers";
import { AdminShell } from "@/components/layout/AdminShell";
import { parseUserCookie, USER_COOKIE } from "@/lib/session";

/**
 * Layout grup (admin) — tanda kurung membuat folder ini tidak muncul di URL.
 * Semua halaman di dalamnya berbagi Sidebar + Header yang sama.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  const user = parseUserCookie(store.get(USER_COOKIE)?.value);

  return <AdminShell user={user}>{children}</AdminShell>;
}
