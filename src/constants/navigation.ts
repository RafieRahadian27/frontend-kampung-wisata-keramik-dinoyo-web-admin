import { ChartSpline, IdCard, LayoutGrid, type LucideIcon, Palette, Store, Warehouse } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Rute lain yang tetap menandai menu ini aktif (mis. halaman edit toko). */
  matches?: RegExp;
}

export const ADMIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Kelola Toko & Pengrajin", href: "/toko", icon: Store, matches: /^\/toko\/(?!tambah)[^/]+/ },
  { label: "Tambah Toko", href: "/toko/tambah", icon: Warehouse },
  { label: "Kelola Produk", href: "/produk", icon: Palette },
  { label: "Akun Pengrajin", href: "/akun", icon: IdCard },
  { label: "Laporan & Kunjungan", href: "/laporan", icon: ChartSpline },
];

export const PORTAL_PUBLIK_URL = "https://keramikdinoyo.id";
