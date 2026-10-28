import type { Aktivitas, RiwayatAkun } from "@/types";

/*
 * Data contoh untuk seksi yang belum punya endpoint di Express.
 * Tabel `audit_log` sudah ada di MySQL — nanti cukup ganti sumber data ini dengan fetch ke API.
 */

export const AKTIVITAS_TERBARU: Aktivitas[] = [
  {
    id: "akt-1",
    jenis: "verifikasi",
    judul: "Pengajuan Studio Tanah Sari ditinjau",
    detail: "Gang 2 No. 05 • menunggu kunjungan studio",
    pelaku: "Admin Paguyuban",
    waktu: "10 menit lalu",
  },
  {
    id: "akt-2",
    jenis: "produk",
    judul: "Cangkir Kopi Celadon Matte diperbarui",
    detail: "Stok ditambah 24 pcs • Toko Keramik Sari Asih",
    pelaku: "Pak Bambang Irawan",
    waktu: "42 menit lalu",
  },
  {
    id: "akt-3",
    jenis: "reservasi",
    judul: "Reservasi workshop rombongan SD baru",
    detail: "38 siswa • Sanggar Gerabah Ibu Sri • Sabtu 09.00",
    pelaku: "Portal Publik",
    waktu: "1 jam lalu",
  },
  {
    id: "akt-4",
    jenis: "toko",
    judul: "Profil Keramik Tiga Putra diperbarui",
    detail: "Foto sampul & jam operasional diganti",
    pelaku: "Danang Tri Wicaksono",
    waktu: "3 jam lalu",
  },
  {
    id: "akt-5",
    jenis: "akun",
    judul: "Akun Joko Susilo ditangguhkan",
    detail: "Toko Suvenir Melati • sesi login dicabut",
    pelaku: "Admin Paguyuban",
    waktu: "Kemarin, 16.20",
  },
  {
    id: "akt-6",
    jenis: "toko",
    judul: "Rumah Kriya Keramik ditambahkan",
    detail: "Koridor Jl. MT Haryono 180 • aktif di direktori publik",
    pelaku: "Admin Paguyuban",
    waktu: "Kemarin, 10.05",
  },
];

export const RIWAYAT_AKUN: RiwayatAkun[] = [
  {
    id: "rwy-1",
    jenis: "login",
    akun: "Pak Bambang Irawan",
    toko: "Toko Keramik Sari Asih",
    keterangan: "Masuk ke panel pengrajin",
    perangkat: "Chrome • Android",
    waktu: "Hari ini, 08.14",
  },
  {
    id: "rwy-2",
    jenis: "gagal",
    akun: "Joko Susilo",
    toko: "Toko Suvenir Melati",
    keterangan: "Login ditolak — akun ditangguhkan",
    perangkat: "Safari • iPhone",
    waktu: "Hari ini, 07.52",
  },
  {
    id: "rwy-3",
    jenis: "sandi",
    akun: "Ibu Sri Hartatik",
    toko: "Sanggar Gerabah Ibu Sri",
    keterangan: "Kata sandi diganti lewat sekretariat",
    perangkat: "Chrome • Windows",
    waktu: "Kemarin, 15.30",
  },
  {
    id: "rwy-4",
    jenis: "status",
    akun: "Danang Tri Wicaksono",
    toko: "Keramik Tiga Putra",
    keterangan: "Status diubah: Menunggu → Aktif",
    perangkat: "Admin Paguyuban",
    waktu: "Kemarin, 11.02",
  },
  {
    id: "rwy-5",
    jenis: "login",
    akun: "H. Suwandi Santoso",
    toko: "Galeri Porselen Dinoyo",
    keterangan: "Masuk ke panel pengrajin",
    perangkat: "Edge • Windows",
    waktu: "2 hari lalu, 19.45",
  },
];
