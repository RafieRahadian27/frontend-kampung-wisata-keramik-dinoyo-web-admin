"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, USER_COOKIE } from "@/lib/session";
import type { AdminUser } from "@/types";

const ONE_DAY = 60 * 60 * 24;

/** Simpan token sesi sebagai cookie httpOnly setelah login berhasil di Express. */
export async function createSession(token: string, user: AdminUser, remember: boolean) {
  const store = await cookies();
  const maxAge = remember ? ONE_DAY * 30 : undefined;
  const options = { httpOnly: true, sameSite: "lax" as const, path: "/", secure: process.env.NODE_ENV === "production", maxAge };
  store.set(SESSION_COOKIE, token, options);
  store.set(USER_COOKIE, JSON.stringify(user), options);
}

export async function destroySession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  store.delete(USER_COOKIE);
  redirect("/login?keluar=1");
}
