import {
  type ActionResult,
  createToko,
  putuskanPengajuan,
  removeProduk,
  removeToko,
  updateAkunStatus,
  updateToko,
} from "@/lib/actions/api";
import type { StatusAkun, TokoFormValues } from "@/types";
import { ApiError } from "./config";

/**
 * API untuk Client Components. Setiap fungsi memanggil Server Action (lib/actions/api.ts)
 * yang meneruskan request ke Express beserta token sesi. Kegagalan diubah kembali
 * menjadi ApiError agar komponen cukup memakai try/catch seperti biasa.
 */
async function unwrap<T>(pending: Promise<ActionResult<T>>): Promise<T> {
  const result = await pending;
  if (!result.ok) throw new ApiError(result.status, result.message);
  return result.body;
}

export const tokoApi = {
  create: (values: TokoFormValues) => unwrap(createToko(values)),
  update: (slug: string, values: Partial<TokoFormValues>) => unwrap(updateToko(slug, values)),
  remove: (slug: string) => unwrap(removeToko(slug)),
  putuskanPengajuan: (slug: string, keputusan: "verifikasi" | "tolak") => unwrap(putuskanPengajuan(slug, keputusan)),
};

export const produkApi = {
  remove: (id: number) => unwrap(removeProduk(id)),
};

export const akunApi = {
  updateStatus: (id: number, status: StatusAkun) => unwrap(updateAkunStatus(id, status)),
};
