import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/session";

const ADMIN_PREFIXES = ["/dashboard", "/toko", "/produk", "/akun", "/laporan"];

/**
 * Proxy (pengganti middleware di Next.js 16): melindungi rute admin.
 * - Belum login  → diarahkan ke /login?next=<rute asal>
 * - Sudah login dan membuka /login → langsung ke /dashboard
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE);
  const isAdminRoute = ADMIN_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  if (isAdminRoute && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/toko/:path*", "/produk/:path*", "/akun/:path*", "/laporan/:path*"],
};
