"use client";

import { BadgeCheck, ShieldCheck } from "lucide-react";
import { FormSection } from "@/components/ui/FormSection";
import { Toggle } from "@/components/ui/Toggle";
import type { TokoFormValues } from "@/types";
import type { UpdateField } from "./TokoForm";

interface StatusSectionProps {
  values: TokoFormValues;
  updateField: UpdateField;
}

export function StatusSection({ values, updateField }: StatusSectionProps) {
  return (
    <FormSection title="Status & Akreditasi Paguyuban" description="Kontrol keterbukaan data di portal publik" icon={<ShieldCheck />}>
      <div className="flex flex-col divide-y divide-outline-variant/40">
        <div className="pb-5">
          <Toggle
            label="Aktif di Direktori Publik"
            description="Toko dapat ditemukan oleh wisatawan di peta & pencarian"
            checked={values.aktifPublik}
            onChange={(checked) => updateField("aktifPublik", checked)}
          />
        </div>
        <div className="pt-5">
          <Toggle
            label="Akreditasi Paguyuban Terverifikasi"
            description="Tanda keaslian produk karya pengrajin binaan Dinoyo"
            tone="primary"
            checked={values.akreditasi}
            onChange={(checked) => updateField("akreditasi", checked)}
            adornment={<BadgeCheck className="size-4 text-secondary" aria-hidden />}
          />
        </div>
      </div>
    </FormSection>
  );
}
