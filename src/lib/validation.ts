/**
 * Aturan validasi form autentikasi (login & daftar). Pola regex disamakan dengan
 * `backend/src/validators/index.ts` — validasi di browser memberi umpan balik cepat,
 * sedangkan server tetap memeriksa ulang setiap request.
 */
export const EMAIL_PATTERN = /^(?!\.)(?!.*\.\.)[A-Za-z0-9._%+-]+(?<!\.)@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
const USERNAME_PATTERN = /^[A-Za-z][A-Za-z0-9_]{3,19}$/;
const NAMA_PATTERN = /^[\p{L}][\p{L} .'-]*$/u;
const WHATSAPP_PATTERN = /^(?:62|0)8\d{8,11}$/;

export const UMUR_MIN = 17;
export const UMUR_MAX = 100;
export const PASSWORD_MIN = 8;

type Rule = (value: string) => string | undefined;

/** Pesan email dibuat spesifik agar pengguna tahu bagian mana yang kurang. */
export const validateEmail: Rule = (raw) => {
  const value = raw.trim();
  if (!value) return "Email wajib diisi.";
  if (/\s/.test(value)) return "Email tidak boleh mengandung spasi.";
  if (!value.includes("@")) return "Email harus mengandung tanda @, contoh: air123@gmail.com.";
  if (value.split("@").length > 2) return "Email hanya boleh berisi satu tanda @.";
  const [lokal, domain] = value.split("@");
  if (!lokal) return "Tulis nama pengguna sebelum tanda @, contoh: air123@gmail.com.";
  if (!domain) return "Tulis domain setelah tanda @, contoh: @gmail.com.";
  if (!domain.includes(".")) return "Domain email belum lengkap, contoh: @gmail.com.";
  if (!EMAIL_PATTERN.test(value)) return "Format email tidak valid, contoh: air123@gmail.com.";
  if (value.length > 120) return "Email maksimal 120 karakter.";
  return undefined;
};

export const validateUsername: Rule = (raw) => {
  const value = raw.trim();
  if (!value) return "Username wajib diisi.";
  if (value.includes("@")) return "Username tidak memakai tanda @. Isi email di kolom Email.";
  if (/\s/.test(value)) return "Username tidak boleh mengandung spasi.";
  if (!/^[A-Za-z]/.test(value)) return "Username harus diawali huruf.";
  if (!/^[A-Za-z0-9_]+$/.test(value)) return "Username hanya boleh huruf, angka, dan garis bawah (_).";
  if (!USERNAME_PATTERN.test(value)) return "Username harus 4–20 karakter.";
  return undefined;
};

export const validateNama: Rule = (raw) => {
  const value = raw.trim();
  if (!value) return "Nama lengkap wajib diisi.";
  if (/\d/.test(value)) return "Nama lengkap tidak boleh mengandung angka.";
  if (!NAMA_PATTERN.test(value)) return "Nama hanya boleh berisi huruf, spasi, titik, atau tanda petik.";
  if (value.length < 3) return "Nama lengkap minimal 3 huruf.";
  if (value.length > 100) return "Nama lengkap maksimal 100 karakter.";
  return undefined;
};

export const validateUmur: Rule = (raw) => {
  const value = raw.trim();
  if (!value) return "Umur wajib diisi.";
  if (!/^\d+$/.test(value)) return "Umur hanya boleh diisi angka, contoh: 37 (bukan “tiga tujuh”).";
  const umur = Number(value);
  if (umur < UMUR_MIN) return `Umur minimal ${UMUR_MIN} tahun.`;
  if (umur > UMUR_MAX) return `Umur maksimal ${UMUR_MAX} tahun.`;
  return undefined;
};

export const validateNik: Rule = (raw) => {
  const value = raw.trim();
  if (!value) return "NIK wajib diisi.";
  if (!/^\d+$/.test(value)) return "NIK hanya boleh berisi angka.";
  if (value.length !== 16) return `NIK harus 16 digit (sekarang ${value.length} digit).`;
  return undefined;
};

export const validateWhatsapp: Rule = (raw) => {
  const value = raw.trim();
  if (!value) return "Nomor WhatsApp wajib diisi.";
  if (!/^\d+$/.test(value)) return "Nomor WhatsApp hanya boleh berisi angka.";
  if (!/^(?:62|0)8/.test(value)) return "Nomor WhatsApp harus diawali 08 atau 628.";
  if (!WHATSAPP_PATTERN.test(value)) return "Nomor WhatsApp harus 10–14 digit.";
  return undefined;
};

export const validatePassword: Rule = (value) => {
  if (!value) return "Kata sandi wajib diisi.";
  if (/\s/.test(value)) return "Kata sandi tidak boleh mengandung spasi.";
  if (value.length < PASSWORD_MIN) return `Kata sandi minimal ${PASSWORD_MIN} karakter.`;
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return "Kata sandi harus mengandung huruf dan angka.";
  if (value.length > 100) return "Kata sandi maksimal 100 karakter.";
  return undefined;
};

/** Teks wajib dengan batas panjang (nama toko, lokasi). */
export function requiredText(label: string, min: number, max: number): Rule {
  return (raw) => {
    const value = raw.trim();
    if (!value) return `${label} wajib diisi.`;
    if (value.length < min) return `${label} minimal ${min} karakter.`;
    if (value.length > max) return `${label} maksimal ${max} karakter.`;
    return undefined;
  };
}

/** Kolom login menerima email ATAU username: ada "@" → dinilai sebagai email. */
export const validateLoginIdentifier: Rule = (raw) => {
  const value = raw.trim();
  if (!value) return "Email atau username wajib diisi.";
  if (value.includes("@")) return validateEmail(value);
  if (/\s/.test(value)) return "Username tidak boleh mengandung spasi.";
  if (!/^[A-Za-z0-9_]+$/.test(value)) return "Username hanya boleh huruf, angka, dan garis bawah (_).";
  return undefined;
};

/** Buang karakter selain angka; `rejected` true bila ada yang dibuang (untuk menampilkan peringatan). */
export function digitsOnly(value: string, maxLength?: number) {
  const digits = value.replace(/\D/g, "");
  return { value: maxLength ? digits.slice(0, maxLength) : digits, rejected: digits.length !== value.length };
}

/** Skor 0–4 untuk indikator kekuatan kata sandi. */
export function passwordStrength(value: string): 0 | 1 | 2 | 3 | 4 {
  if (!value) return 0;
  let score = 0;
  if (value.length >= PASSWORD_MIN) score++;
  if (/[A-Za-z]/.test(value) && /\d/.test(value)) score++;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value) || value.length >= 12) score++;
  return Math.max(1, score) as 1 | 2 | 3 | 4;
}
