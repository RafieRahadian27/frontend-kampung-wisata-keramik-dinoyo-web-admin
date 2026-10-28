import "server-only";

import { cookies } from "next/headers";
import { forbidden, redirect } from "next/navigation";
import { cache } from "react";
import { API_BASE_URL, parseResponse } from "@/lib/api/config";
import { SESSION_COOKIE } from "@/lib/session";
import type { AdminUser, Permission } from "@/types";

/**
 * Data Access Layer (DAL) — batas keamanan sebenarnya di sisi Next.js.
 * Proxy hanya mengecek "ada cookie atau tidak" (optimistik); di sini sesi
 * diverifikasi ulang ke Express pada setiap request sebelum data dibaca/ditulis.
 * `server-only` memastikan file ini gagal di-build bila terimpor ke Client Component.
 */

export async function getSessionToken() {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

/** fetch ke Express dengan token sesi di header Authorization (token tidak pernah sampai ke browser). */
export async function authFetch(path: string, init: RequestInit = {}) {
  const token = await getSessionToken();
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return fetch(`${API_BASE_URL}${path}`, { ...init, headers });
}

/**
 * Pengguna yang sedang login, atau null bila sesi tidak ada/dicabut/kedaluwarsa.
 * Tanpa cache data (selalu cek ke server) agar logout & penangguhan akun berlaku seketika;
 * `cache` React hanya mendeduplikasi panggilan dalam satu render.
 */
export const getCurrentUser = cache(async (): Promise<AdminUser | null> => {
  if (!(await getSessionToken())) return null;
  const response = await authFetch("/auth/me", { cache: "no-store" });
  if (response.status === 401) return null;
  const { data } = await parseResponse<{ data: AdminUser }>(response);
  return data;
});

/** Wajib login. Sesi tidak valid → kembali ke halaman login. */
export async function verifySession(): Promise<AdminUser> {
  const user = await getCurrentUser();
  if (!user) redirect((await getSessionToken()) ? "/login?sesi=berakhir" : "/login");
  return user;
}

/** Wajib login DAN punya izin. Login tapi tidak berizin → 403 (forbidden.tsx). */
export async function requirePermission(permission: Permission): Promise<AdminUser> {
  const user = await verifySession();
  if (!user.izin.includes(permission)) forbidden();
  return user;
}
