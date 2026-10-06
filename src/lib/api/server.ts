import type {
  Akun,
  DashboardData,
  KategoriProduk,
  LaporanData,
  Produk,
  RingkasanAkun,
  RingkasanProduk,
  RingkasanToko,
  Toko,
} from "@/types";
import { API_BASE_URL, CACHE_TAGS, type CacheTag, parseResponse } from "./config";

/**
 * Fetch data dari Express di sisi server (dipanggil oleh Server Components).
 * Hasilnya disimpan di Data Cache Next.js selama `revalidate` detik dan diberi tag,
 * sehingga request berulang tidak membebani backend. Setelah ada perubahan data,
 * tag di-invalidasi lewat Server Action (lihat lib/actions/cache.ts).
 */
async function getJson<T>(path: string, tag: CacheTag, revalidate = 60): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    next: { revalidate, tags: [tag] },
  });
  return parseResponse<T>(response);
}

export async function getDashboard() {
  const { data } = await getJson<{ data: DashboardData }>("/dashboard", CACHE_TAGS.dashboard, 30);
  return data;
}

export async function getTokoList() {
  return getJson<{ data: Toko[]; ringkasan: RingkasanToko }>("/toko", CACHE_TAGS.toko);
}

export async function getToko(slug: string) {
  const { data } = await getJson<{ data: Toko }>(`/toko/${encodeURIComponent(slug)}`, CACHE_TAGS.toko);
  return data;
}

export async function getProdukList() {
  return getJson<{ data: Produk[]; kategori: KategoriProduk[]; ringkasan: RingkasanProduk }>("/produk", CACHE_TAGS.produk);
}

export async function getAkunList() {
  return getJson<{ data: Akun[]; ringkasan: RingkasanAkun }>("/akun", CACHE_TAGS.akun);
}

export async function getLaporan() {
  const { data } = await getJson<{ data: LaporanData }>("/laporan", CACHE_TAGS.laporan, 300);
  return data;
}
