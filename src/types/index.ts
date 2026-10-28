/* Tipe data yang dikirim oleh REST API Express (lihat backend/src/types). */

export type Tone = "primary" | "secondary" | "tertiary" | "neutral" | "error" | "solid";

export type Role = "admin" | "pengrajin";

export type Permission =
  | "dashboard:read"
  | "laporan:read"
  | "toko:read"
  | "toko:create"
  | "toko:update"
  | "toko:delete"
  | "pengajuan:decide"
  | "produk:read"
  | "produk:delete"
  | "akun:read"
  | "akun:update";

/** Pengguna yang sedang login, hasil verifikasi sesi oleh Express (`GET /auth/me`). */
export interface AdminUser {
  id: number;
  nama: string;
  sapaan: string;
  email: string;
  /** Label peran untuk tampilan, mis. "Admin Paguyuban". */
  peran: string;
  role: Role;
  izin: Permission[];
  tokoSlugs: string[];
}

export type StatusToko = "terverifikasi" | "menunggu" | "nonaktif";
export type BadgeToko = "baru" | "unggulan" | "maestro";

export interface Toko {
  id: number;
  slug: string;
  nama: string;
  nib: string;
  keterangan: string;
  pemilik: string;
  whatsapp: string;
  lokasiGang: string;
  wilayah: string;
  alamat: string;
  koordinat: string;
  spesialisasi: string;
  kategori: string[];
  jumlahProduk: number;
  tahunBerdiri: number;
  deskripsi: string;
  jamBuka: string;
  status: StatusToko;
  badge?: BadgeToko;
  foto: string;
  aktifPublik: boolean;
  akreditasi: boolean;
  diperbarui: string;
  /** Belum disimpan oleh API (frontend dulu) — bisa kosong. */
  fasilitas?: string[];
}

export type TokoFormValues = { fasilitas: string[] } & Pick<
  Toko,
  | "nama"
  | "pemilik"
  | "tahunBerdiri"
  | "kategori"
  | "deskripsi"
  | "wilayah"
  | "alamat"
  | "koordinat"
  | "whatsapp"
  | "jamBuka"
  | "aktifPublik"
  | "akreditasi"
>;

export interface RingkasanToko {
  total: number;
  terverifikasi: number;
  menunggu: number;
  nonaktif: number;
  katalogAktif: number;
}

export interface PengajuanToko {
  slug: string;
  nama: string;
  lokasiGang: string;
  pengrajin: string;
  keahlian: string;
  diajukan: string;
  foto: string;
}

export type StatusProduk = "tersedia" | "habis" | "preorder";

export interface Produk {
  id: number;
  nama: string;
  sku: string;
  tokoSlug: string;
  teknik: string;
  foto: string;
  badge?: string;
  toko: { nama: string; inisial: string; pengrajin: string };
  kategori: string;
  bahan: string;
  harga: number;
  catatanHarga: string;
  status: StatusProduk;
  stokLabel: string;
  lokasiStok: string;
}

export interface KategoriProduk {
  nama: string;
  jumlah: number;
}

export interface RingkasanProduk {
  totalKoleksi: number;
  pengrajin: number;
  stokTersedia: number;
  preOrder: number;
  suhuBakar: string;
}

export type PeranAkun = "Pemilik Toko" | "Staf Pengrajin";
export type StatusAkun = "aktif" | "menunggu" | "ditangguhkan";

export interface Akun {
  id: number;
  nama: string;
  inisial: string;
  nik: string;
  email: string;
  toko: string;
  lokasi: string;
  peran: PeranAkun;
  whatsapp: string;
  status: StatusAkun;
  terakhirAktif: string;
  tone: Tone;
  /** Diisi saat pendaftaran mandiri; akun dari data awal boleh kosong. */
  umur?: number | null;
}

/** Body POST /auth/register (pendaftaran mandiri pengrajin). */
export interface RegisterPayload {
  nama: string;
  umur: number;
  nik: string;
  whatsapp: string;
  toko: string;
  lokasi: string;
  peran: PeranAkun;
  username: string;
  email: string;
  password: string;
}

export interface RingkasanAkun {
  total: number;
  aktif: number;
  menunggu: number;
  sesiHariIni: number;
  tokoAktif: number;
  persenAktifPekan: number;
}

export interface StatistikDashboard {
  nilai: number;
  catatan: string;
  lencana: string;
}

export interface DashboardData {
  admin: AdminUser;
  tanggal: string;
  statistik: Record<"toko" | "produk" | "pengrajin" | "reservasi", StatistikDashboard>;
  verifikasi: {
    pengajuan: PengajuanToko[];
    terakhirDisetujui: { nama: string; catatan: string };
    totalPendaftarTahunIni: number;
  };
  whatsapp: {
    totalKlik: number;
    pertumbuhan: number;
    harian: { hari: string; nilai: number; sorot?: "primary" | "secondary" }[];
    gang: { nama: string; klik: number; persen: number; tone: Tone }[];
  };
  kelasAkhirPekan: { judul: string; catatan: string };
}

export interface LaporanData {
  periode: string;
  ringkasan: {
    totalWisatawan: { nilai: number; pertumbuhan: number; pembanding: string };
    workshopSelesai: { nilai: number; mendatang: number; okupansi: number };
    estimasiOmzet: { nilai: string; pertumbuhan: number; keterangan: string };
    konversiWhatsapp: { nilai: number; perHari: number; keterangan: string };
  };
  tren: { label: string; sekolah: number; mandiri: number; catatan?: string; parsial?: boolean }[];
  sebaranLorong: { nama: string; persen: number; detail: string; tone: Tone }[];
  reservasi: {
    id: string;
    pemesan: string;
    detail: string;
    paket: string;
    paketTone: Tone;
    studio: string;
    tanggal: string;
    jam: string;
  }[];
  paketTerlaris: {
    rating: string;
    daftar: { nama: string; detail: string; tren: "naik" | "stabil" }[];
  };
  unduhan: { judul: string; detail: string; jenis: "kas" | "sertifikat" | "rekap" }[];
}

/* Data statis frontend (lihat src/data) — menunggu endpoint audit log di Express. */

export type JenisAktivitas = "toko" | "produk" | "akun" | "verifikasi" | "reservasi";

export interface Aktivitas {
  id: string;
  jenis: JenisAktivitas;
  judul: string;
  detail: string;
  pelaku: string;
  waktu: string;
}

export type JenisRiwayatAkun = "login" | "gagal" | "status" | "sandi";

export interface RiwayatAkun {
  id: string;
  jenis: JenisRiwayatAkun;
  akun: string;
  toko: string;
  keterangan: string;
  perangkat: string;
  waktu: string;
}

/**
 * Format respons standar dari Express:
 *   sukses → { success: true, message?, data, meta? }
 *   gagal  → { success: false, message, error: { code, details? }, meta: { requestId, timestamp } }
 */
export interface ApiResponse<T, M = undefined> {
  success: boolean;
  data: T;
  message?: string;
  meta: M;
}
