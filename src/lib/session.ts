import type { AdminUser } from "@/types";

export const SESSION_COOKIE = "kd_session";
export const USER_COOKIE = "kd_user";

export const FALLBACK_ADMIN: AdminUser = {
  nama: "Admin Dinoyo",
  sapaan: "Pak Joko Santoso",
  email: "admin@keramikdinoyo.id",
  peran: "Admin Paguyuban",
};

export function parseUserCookie(value: string | undefined): AdminUser {
  if (!value) return FALLBACK_ADMIN;
  try {
    return { ...FALLBACK_ADMIN, ...(JSON.parse(value) as Partial<AdminUser>) };
  } catch {
    return FALLBACK_ADMIN;
  }
}
