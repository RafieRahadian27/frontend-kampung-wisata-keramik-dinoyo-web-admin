"use client";

import { Calendar, Check, Coffee, GraduationCap, Minus, Signature, Store, UserRound, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { FieldShell, TextField } from "@/components/ui/FormField";
import { FormSection } from "@/components/ui/FormSection";
import { cn } from "@/lib/utils";
import type { TokoFormValues } from "@/types";
import { KATEGORI_SPESIALISASI, MAX_NAMA, type TokoFormErrors } from "./formConfig";
import type { UpdateField } from "./TokoForm";

const KATEGORI_ICON: Record<(typeof KATEGORI_SPESIALISASI)[number], LucideIcon> = {
  "Semi-Porselen": Coffee,
  "Gerabah Alami": Check,
  "Guci & Hiasan": Minus,
  "Tableware Kafe": UtensilsCrossed,
  "Edukasi Workshop": GraduationCap,
};

interface SectionProps {
  values: TokoFormValues;
  errors: TokoFormErrors;
  updateField: UpdateField;
}

export function IdentitySection({ values, errors, updateField }: SectionProps) {
  const toggleKategori = (kategori: string) => {
    const next = values.kategori.includes(kategori)
      ? values.kategori.filter((item) => item !== kategori)
      : [...values.kategori, kategori];
    updateField("kategori", next);
  };

  return (
    <FormSection title="Identitas & Profil Kriya" description="Informasi autentik pengrajin dan nama galeri komersial" icon={<Signature />}>
      <TextField
        label="Nama Toko / Galeri"
        required
        aside={`${values.nama.length}/${MAX_NAMA} karakter`}
        maxLength={MAX_NAMA}
        placeholder="Contoh: Toko Keramik Sari Asih"
        value={values.nama}
        onChange={(event) => updateField("nama", event.target.value)}
        error={errors.nama}
        trailing={<Store className="size-4 text-on-surface-variant" aria-hidden />}
        className="pr-11"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TextField
          label="Nama Pengrajin / Penanggung Jawab"
          required
          placeholder="Nama lengkap"
          value={values.pemilik}
          onChange={(event) => updateField("pemilik", event.target.value)}
          error={errors.pemilik}
          trailing={<UserRound className="size-4 text-on-surface-variant" aria-hidden />}
          className="pr-11"
        />
        <TextField
          label="Tahun Berdiri Studio"
          required
          type="number"
          inputMode="numeric"
          min={1900}
          max={new Date().getFullYear()}
          value={values.tahunBerdiri || ""}
          onChange={(event) => updateField("tahunBerdiri", Number(event.target.value))}
          error={errors.tahunBerdiri}
          trailing={<Calendar className="size-4 text-on-surface-variant" aria-hidden />}
          className="pr-11"
        />
      </div>

      <FieldShell id="kategori-spesialisasi" label="Kategori Spesialisasi Dinoyo" aside="Pilih spesialisasi utama" error={errors.kategori}>
        <div
          id="kategori-spesialisasi"
          role="group"
          tabIndex={-1}
          data-invalid={Boolean(errors.kategori) || undefined}
          className="flex flex-wrap gap-3 outline-none"
        >
          {KATEGORI_SPESIALISASI.map((kategori) => {
            const active = values.kategori.includes(kategori);
            const Icon = KATEGORI_ICON[kategori];
            return (
              <button
                key={kategori}
                type="button"
                aria-pressed={active}
                onClick={() => toggleKategori(kategori)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                  active ? "bg-secondary text-on-secondary" : "bg-surface-high text-on-surface hover:bg-surface-highest",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {kategori}
              </button>
            );
          })}
        </div>
      </FieldShell>
    </FormSection>
  );
}
