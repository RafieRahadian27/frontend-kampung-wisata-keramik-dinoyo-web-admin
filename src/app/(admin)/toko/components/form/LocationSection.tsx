"use client";

import { LocateFixed, MapPin } from "lucide-react";
import Image from "next/image";
import { SelectField, TextField } from "@/components/ui/FormField";
import { FormSection } from "@/components/ui/FormSection";
import type { TokoFormValues } from "@/types";
import { WILAYAH_LORONG, type TokoFormErrors } from "./formConfig";
import type { UpdateField } from "./TokoForm";

interface LocationSectionProps {
  values: TokoFormValues;
  errors: TokoFormErrors;
  updateField: UpdateField;
}

export function LocationSection({ values, errors, updateField }: LocationSectionProps) {
  const wilayahOptions = WILAYAH_LORONG.includes(values.wilayah) ? WILAYAH_LORONG : [values.wilayah, ...WILAYAH_LORONG];

  return (
    <FormSection title="Lokasi Lorong Dinoyo" description="Pemetaan jalan dan nomor presisi sentra keramik" icon={<MapPin />}>
      <SelectField
        label="Wilayah Lorong / Gang"
        required
        options={wilayahOptions}
        value={values.wilayah}
        onChange={(event) => updateField("wilayah", event.target.value)}
        error={errors.wilayah}
      />
      <TextField
        label="Alamat Lengkap & Nomor Studio"
        placeholder="Jl. MT Haryono Gg. IX No. 42B, Dinoyo, Lowokwaru"
        value={values.alamat}
        onChange={(event) => updateField("alamat", event.target.value)}
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold">
          <span className="text-on-surface">Pin Koordinat Digital</span>
          <span className="inline-flex items-center gap-1 text-[11px] text-primary">
            <LocateFixed className="size-3.5" aria-hidden />
            {values.koordinat}
          </span>
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-surface-high">
          <Image src="/images/peta-dinoyo.jpg" alt="Peta lokasi sentra keramik Dinoyo" loading="eager" fill sizes="(min-width: 1280px) 320px, 100vw" className="object-cover" />
          <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[#1e1b18] shadow-card">
            <MapPin className="size-3.5 text-[#9a4023]" aria-hidden />
            Tersemat di Sentra Dinoyo
          </span>
        </div>
      </div>
    </FormSection>
  );
}
