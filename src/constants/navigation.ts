import { ChartSpline, IdCard, LayoutGrid, type LucideIcon, Palette, Store, Warehouse } from "lucide-react";
import type { Permission } from "@/types";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Izin yang dibutuhkan agar menu tampil (hanya UI — penegakan ada di DAL & API). */
  izin: Permission;
  /** Rute lain yang tetap menandai menu ini aktif (mis. halaman edit toko). */
  matches?: RegExp;
}

export const ADMIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid, izin: "dashboard:read" },
  { label: "Kelola Toko & Pengrajin", href: "/toko", icon: Store, izin: "toko:read", matches: /^\/toko\/(?!tambah)[^/]+/ },
  { label: "Tambah Toko", href: "/toko/tambah", icon: Warehouse, izin: "toko:create" },
  { label: "Kelola Produk", href: "/produk", icon: Palette, izin: "produk:read" },
  { label: "Akun Pengrajin", href: "/akun", icon: IdCard, izin: "akun:read" },
  { label: "Laporan & Kunjungan", href: "/laporan", icon: ChartSpline, izin: "laporan:read" },
];

/** Halaman awal sesuai peran: menu pertama yang boleh diakses pengguna. */
export function homePathFor(izin: Permission[]): string {
  return ADMIN_NAV.find((item) => izin.includes(item.izin))?.href ?? "/login";
}

export const PORTAL_PUBLIK_URL = "https://keramikdinoyo.id";
