"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authFetch } from "@/lib/dal";
import { SESSION_COOKIE } from "@/lib/session";
import type { Akun, ApiResponse, StatusAkun, Toko, TokoFormValues } from "@/types";

/**
 * Mutasi data lewat Server Action: browser tidak lagi memanggil Express langsung,
 * sehingga token sesi tetap di server. Express tetap memeriksa izin & kepemilikan.
 *
 * Hasil dikembalikan sebagai objek (bukan throw) karena pesan error dari Server Action
 * disamarkan di mode produksi — pesan 403/404/422 dari API tetap sampai ke pengguna.
 */
export type ActionResult<T> = { ok: true; body: T } | { ok: false; status: number; message: string };

async function call<T>(path: string, method: string, payload?: unknown): Promise<ActionResult<T>> {
  let response: Response;
  try {
    response = await authFetch(path, {
      method,
      headers: { "Content-Type": "application/json" },
      body: payload === undefined ? undefined : JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    return { ok: false, status: 503, message: "Server API tidak dapat dihubungi." };
  }

  if (response.status === 401) {
    // Sesi dicabut/kedaluwarsa di server → bersihkan cookie & minta login ulang.
    (await cookies()).delete(SESSION_COOKIE);
    redirect("/login?sesi=berakhir");
  }

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    return { ok: false, status: response.status, message: body?.message ?? `Permintaan gagal (${response.status})` };
  }
  return { ok: true, body: body as T };
}

const seg = encodeURIComponent;

export async function createToko(values: TokoFormValues) {
  return call<ApiResponse<Toko>>("/toko", "POST", values);
}

export async function updateToko(slug: string, values: Partial<TokoFormValues>) {
  return call<ApiResponse<Toko>>(`/toko/${seg(slug)}`, "PUT", values);
}

export async function removeToko(slug: string) {
  return call<{ message: string }>(`/toko/${seg(slug)}`, "DELETE");
}

export async function putuskanPengajuan(slug: string, keputusan: "verifikasi" | "tolak") {
  return call<{ message: string }>(`/pengajuan/${seg(slug)}`, "PATCH", { keputusan });
}

export async function removeProduk(id: number) {
  return call<{ message: string }>(`/produk/${seg(String(id))}`, "DELETE");
}

export async function updateAkunStatus(id: number, status: StatusAkun) {
  return call<ApiResponse<Akun>>(`/akun/${seg(String(id))}/status`, "PATCH", { status });
}
