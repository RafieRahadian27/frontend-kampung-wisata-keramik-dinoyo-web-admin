import type { AdminUser, Akun, ApiResponse, StatusAkun, Toko, TokoFormValues } from "@/types";
import { API_BASE_URL, parseResponse } from "./config";

/** Request dari browser (Client Components) ke Express menggunakan Fetch API. */
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init.headers },
  });
  return parseResponse<T>(response);
}

const json = (body: unknown) => JSON.stringify(body);

export const authApi = {
  login: (identifier: string, password: string) =>
    request<ApiResponse<{ token: string; user: AdminUser }>>("/auth/login", {
      method: "POST",
      body: json({ identifier, password }),
    }),
  logout: () => request<{ message: string }>("/auth/logout", { method: "POST" }),
};

export const tokoApi = {
  create: (values: TokoFormValues) => request<ApiResponse<Toko>>("/toko", { method: "POST", body: json(values) }),
  update: (slug: string, values: Partial<TokoFormValues>) =>
    request<ApiResponse<Toko>>(`/toko/${slug}`, { method: "PUT", body: json(values) }),
  remove: (slug: string) => request<{ message: string }>(`/toko/${slug}`, { method: "DELETE" }),
  putuskanPengajuan: (slug: string, keputusan: "verifikasi" | "tolak") =>
    request<{ message: string }>(`/pengajuan/${slug}`, { method: "PATCH", body: json({ keputusan }) }),
};

export const produkApi = {
  remove: (id: number) => request<{ message: string }>(`/produk/${id}`, { method: "DELETE" }),
};

export const akunApi = {
  updateStatus: (id: number, status: StatusAkun) =>
    request<ApiResponse<Akun>>(`/akun/${id}/status`, { method: "PATCH", body: json({ status }) }),
};
