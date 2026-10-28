import "server-only";

import { forbidden, redirect } from "next/navigation";
import { authFetch } from "@/lib/dal";
import type {
  Akun,
  ApiResponse,
  DashboardData,
  KategoriProduk,
  LaporanData,
  Produk,
  RingkasanAkun,
  RingkasanProduk,
  RingkasanToko,
  Toko,
} from "@/types";
import { CACHE_TAGS, type CacheTag, parseResponse } from "./config";

/**
 * Fetch data dari Express di sisi server (dipanggil oleh Server Components).
 * Hasilnya disimpan di Data Cache Next.js selama `revalidate` detik dan diberi tag,
 * sehingga request berulang tidak membebani backend. Setelah ada perubahan data,
 * tag di-invalidasi lewat Server Action (lihat lib/actions/cache.ts).
 *
 * Header Authorization ikut menjadi bagian cache key Next.js, jadi cache terpisah
 * per sesi — data pengguna A tidak pernah tersaji ke pengguna B. Halaman tetap
 * wajib memanggil `requirePermission()` (tanpa cache) sebelum memakai data ini.
 */
async function getJson<T>(path: string, tag: CacheTag, revalidate = 60): Promise<T> {
  const response = await authFetch(path, {
    next: { revalidate, tags: [tag] },
  });
  if (response.status === 401) redirect("/login?sesi=berakhir");
  if (response.status === 403) forbidden();
  return parseResponse<T>(response);
}

export async function getDashboard() {
  const { data } = await getJson<ApiResponse<DashboardData>>("/dashboard", CACHE_TAGS.dashboard, 30);
  return data;
}

/** Daftar + ringkasan: ringkasan dikirim Express di `meta`, lalu diratakan agar mudah dipakai halaman. */
export async function getTokoList() {
  const { data, meta } = await getJson<ApiResponse<Toko[], { ringkasan: RingkasanToko }>>("/toko", CACHE_TAGS.toko);
  return { data, ringkasan: meta.ringkasan };
}

export async function getToko(slug: string) {
  const { data } = await getJson<ApiResponse<Toko>>(`/toko/${encodeURIComponent(slug)}`, CACHE_TAGS.toko);
  return data;
}

export async function getProdukList() {
  const { data, meta } = await getJson<ApiResponse<Produk[], { kategori: KategoriProduk[]; ringkasan: RingkasanProduk }>>(
    "/produk",
    CACHE_TAGS.produk,
  );
  return { data, kategori: meta.kategori, ringkasan: meta.ringkasan };
}

export async function getAkunList() {
  const { data, meta } = await getJson<ApiResponse<Akun[], { ringkasan: RingkasanAkun }>>("/akun", CACHE_TAGS.akun);
  return { data, ringkasan: meta.ringkasan };
}

export async function getLaporan() {
  const { data } = await getJson<ApiResponse<LaporanData>>("/laporan", CACHE_TAGS.laporan, 300);
  return data;
}
