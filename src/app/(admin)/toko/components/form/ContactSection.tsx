"use client";

import { ContactRound, MessageSquareText } from "lucide-react";
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

/** Jam operasional dipindah ke OperationalSection; seksi ini khusus kontak pemesanan. */
export function ContactSection({ values, errors, updateField }: ContactSectionProps) {
  return (
    <FormSection title="Komunikasi & Pemesanan" description="Aksesibilitas pembeli langsung ke pengrajin" icon={<ContactRound />}>
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
    </FormSection>
  );
}
