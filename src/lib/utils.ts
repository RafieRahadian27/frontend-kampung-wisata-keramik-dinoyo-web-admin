/** Menggabungkan className kondisional tanpa dependensi tambahan. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatRupiah(value: number): string {
  // Intl menghasilkan "Rp 85.000" dengan non-breaking space; samakan dengan spasi biasa.
  return rupiahFormatter.format(value).replace(/ /g, " ");
}

export function formatAngka(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

/** Format ribuan bergaya desain dashboard (1,480) yang memakai pemisah koma. */
export function formatRibuan(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function inisial(nama: string): string {
  return nama
    .replace(/^(Pak|Bpk\.|Ibu|H\.)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((kata) => kata[0]?.toUpperCase() ?? "")
    .join("");
}
