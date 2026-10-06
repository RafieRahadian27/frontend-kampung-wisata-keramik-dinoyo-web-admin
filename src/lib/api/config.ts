/** Alamat REST API Express. Atur lewat NEXT_PUBLIC_API_URL di .env.local. */
export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api").replace(/\/$/, "");

/** Tag cache Next.js — dipakai untuk invalidasi data setelah mutasi. */
export const CACHE_TAGS = {
  dashboard: "dashboard",
  toko: "toko",
  produk: "produk",
  akun: "akun",
  laporan: "laporan",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function parseResponse<T>(response: Response): Promise<T> {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(response.status, body?.message ?? `Permintaan gagal (${response.status})`);
  }
  return body as T;
}
