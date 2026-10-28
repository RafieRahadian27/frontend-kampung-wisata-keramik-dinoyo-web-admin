"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "@/lib/api/config";
import { safeRedirectPath, SESSION_COOKIE } from "@/lib/session";
import type { AdminUser, RegisterPayload } from "@/types";

export type LoginResult = { ok: true; sapaan: string; redirectTo: string } | { ok: false; message: string };

export type RegisterResult =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors: Partial<Record<keyof RegisterPayload, string>> };

/**
 * Header JSON + IP pengguna asli. Tanpa X-Forwarded-For, Express melihat semua request
 * datang dari server Next.js sehingga batas percobaan login/daftar berlaku untuk semua orang sekaligus.
 */
async function jsonHeaders() {
  const forwardedFor = (await headers()).get("x-forwarded-for");
  return { "Content-Type": "application/json", ...(forwardedFor ? { "X-Forwarded-For": forwardedFor } : {}) };
}

interface LoginInput {
  identifier: string;
  password: string;
  remember: boolean;
  next?: string;
}

function revokeOnServer(token: string) {
  return fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  }).catch(() => undefined);
}

/**
 * Login dijalankan di server (Server Action): kredensial diteruskan ke Express,
 * lalu token sesi disimpan sebagai cookie HttpOnly — JavaScript di browser
 * tidak pernah melihat token tersebut.
 */
export async function login({ identifier, password, remember, next }: LoginInput): Promise<LoginResult> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: await jsonHeaders(),
      body: JSON.stringify({ identifier, password, remember }),
      cache: "no-store",
    });
  } catch {
    return { ok: false, message: "Server API tidak dapat dihubungi." };
  }

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    return { ok: false, message: body?.message ?? `Login gagal (${response.status})` };
  }

  const { token, expiresAt, user } = body.data as { token: string; expiresAt: string; user: AdminUser };
  const store = await cookies();

  // Rotasi sesi: sesi lama di browser ini (jika ada) dicabut, diganti ID baru.
  const oldToken = store.get(SESSION_COOKIE)?.value;
  if (oldToken) await revokeOnServer(oldToken);

  store.set(SESSION_COOKIE, token, {
    httpOnly: true, // tidak bisa dibaca JavaScript → aman dari pencurian via XSS
    secure: process.env.NODE_ENV === "production", // hanya lewat HTTPS di produksi
    sameSite: "lax", // tidak ikut terkirim pada request lintas situs → menahan CSRF
    path: "/",
    // "Ingat saya" → cookie persisten mengikuti masa berlaku sesi; selain itu hilang saat browser ditutup.
    expires: remember ? new Date(expiresAt) : undefined,
  });

  return { ok: true, sapaan: user.sapaan, redirectTo: safeRedirectPath(next) };
}

/**
 * Pendaftaran pengrajin. Tidak membuat sesi: akun baru berstatus "menunggu"
 * dan baru bisa login setelah diaktifkan admin paguyuban.
 * Error per field dari API (422 validasi, 409 data sudah terdaftar) dipetakan ke kolomnya.
 */
export async function register(payload: RegisterPayload): Promise<RegisterResult> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: await jsonHeaders(),
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    return { ok: false, message: "Server API tidak dapat dihubungi.", fieldErrors: {} };
  }

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const details: { field?: string; message?: string }[] = Array.isArray(body?.error?.details) ? body.error.details : [];
    const fieldErrors: Partial<Record<keyof RegisterPayload, string>> = {};
    for (const { field, message } of details) {
      if (field && message && field in payload) fieldErrors[field as keyof RegisterPayload] = `${message}.`;
    }
    return { ok: false, message: body?.message ?? `Pendaftaran gagal (${response.status})`, fieldErrors };
  }
  return { ok: true, message: body?.message ?? "Pendaftaran berhasil." };
}

/** Logout: cabut sesi di server (bukan sekadar hapus cookie), lalu kembali ke login. */
export async function logout() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) await revokeOnServer(token);
  store.delete(SESSION_COOKIE);
  redirect("/login?keluar=1");
}
