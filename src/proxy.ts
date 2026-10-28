import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/session";

const ADMIN_PREFIXES = ["/dashboard", "/toko", "/produk", "/akun", "/laporan"];

/**
 * Proxy (pengganti middleware di Next.js 16): pengecekan OPTIMISTIK saja.
 * Hanya melihat ada/tidaknya cookie sesi lalu mengarahkan ke /login — tanpa
 * memanggil database. Keabsahan sesi & izin diverifikasi ulang di DAL (lib/dal.ts).
 *
 * Catatan: pengalihan /login → /dashboard sengaja tidak dilakukan di sini;
 * cookie yang sudah dicabut di server akan membuat redirect berputar-putar.
 * Halaman login sendiri yang memverifikasi sesi lalu mengalihkan pengguna.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE);
  const isAdminRoute = pathname === "/" || ADMIN_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  if (isAdminRoute && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/") loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/toko/:path*", "/produk/:path*", "/akun/:path*", "/laporan/:path*"],
};
