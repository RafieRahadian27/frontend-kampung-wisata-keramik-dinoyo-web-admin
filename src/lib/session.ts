/**
 * Konstanta sesi yang aman dipakai di proxy (tanpa akses server-only).
 * Cookie hanya berisi token acak (opaque) — data pengguna tidak disimpan di cookie,
 * sehingga ukurannya kecil dan tidak bisa dipalsukan dari browser.
 */
export const SESSION_COOKIE = "kd_session";

/**
 * Cegah open redirect: hanya path internal ("/x"), bukan "//evil.com" atau "/\evil.com".
 */
export function safeRedirectPath(value: unknown, fallback = "/"): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return fallback;
  }
  return value;
}
