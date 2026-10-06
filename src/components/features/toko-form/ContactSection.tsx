"use client";

import { Clock, ContactRound, MessageSquareText } from "lucide-react";
import { TextField } from "@/components/ui/FormField";
import { FormSection } from "@/components/ui/FormSection";
import type { TokoFormValues } from "@/types";
import type { TokoFormErrors } from "./formConfig";
import type { UpdateField } from "./TokoForm";

interface ContactSectionProps {
  values: TokoFormValues;
  errors: TokoFormErrors;
  updateField: UpdateField;
}

export function ContactSection({ values, errors, updateField }: ContactSectionProps) {
  return (
    <FormSection title="Komunikasi & Jam Sambang" description="Aksesibilitas pembeli langsung dan jadwal kunjungan studio" icon={<ContactRound />}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TextField
          label="Nomor WhatsApp Pemesanan"
          required
          type="tel"
          inputMode="tel"
          placeholder="+62 812-3456-7890"
          value={values.whatsapp}
          onChange={(event) => updateField("whatsapp", event.target.value)}
          error={errors.whatsapp}
          hint='Langsung terhubung dengan tombol "Tanya Pengrajin"'
          leadingIcon={<MessageSquareText />}
        />
        <TextField
          label="Jam Buka & Operasional Studio"
          required
          placeholder="Senin - Minggu, 09.00 - 17.00"
          value={values.jamBuka}
          onChange={(event) => updateField("jamBuka", event.target.value)}
          error={errors.jamBuka}
          hint="Tampilkan ketersediaan penerimaan tamu wisata"
          leadingIcon={<Clock />}
        />
      </div>
    </FormSection>
  );
}
