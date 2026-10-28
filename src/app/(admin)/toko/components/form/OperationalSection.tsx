"use client";

import { Bath, Bus, CalendarClock, Check, Clock, Hand, Paintbrush, QrCode, Truck, type LucideIcon } from "lucide-react";
import { FieldShell, TextField } from "@/components/ui/FormField";
import { FormSection } from "@/components/ui/FormSection";
import { cn } from "@/lib/utils";
import type { TokoFormValues } from "@/types";
import { FASILITAS_STUDIO, JAM_BUKA_PRESET, type TokoFormErrors } from "./formConfig";
import type { UpdateField } from "./TokoForm";

const FASILITAS_ICON: Record<(typeof FASILITAS_STUDIO)[number], LucideIcon> = {
  "Workshop Putar Tanah Liat": Hand,
  "Kelas Lukis Keramik": Paintbrush,
  "Area Parkir Bus": Bus,
  "Pembayaran QRIS": QrCode,
  "Pengiriman Luar Kota": Truck,
  "Toilet & Musala": Bath,
};

interface OperationalSectionProps {
  values: TokoFormValues;
  errors: TokoFormErrors;
  updateField: UpdateField;
}

export function OperationalSection({ values, errors, updateField }: OperationalSectionProps) {
  const toggleFasilitas = (fasilitas: string) => {
    const next = values.fasilitas.includes(fasilitas)
      ? values.fasilitas.filter((item) => item !== fasilitas)
      : [...values.fasilitas, fasilitas];
    updateField("fasilitas", next);
  };

  return (
    <FormSection title="Jam Operasional & Fasilitas" description="Jadwal penerimaan tamu dan fasilitas yang tersedia di studio" icon={<CalendarClock />}>
      <div className="flex flex-col gap-3">
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
        <div role="group" aria-label="Pilihan cepat jam operasional" className="flex flex-wrap gap-2">
          {JAM_BUKA_PRESET.map((preset) => (
            <button
              key={preset}
              type="button"
              aria-pressed={values.jamBuka === preset}
              onClick={() => updateField("jamBuka", preset)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
                values.jamBuka === preset
                  ? "bg-secondary-container text-on-secondary-container"
                  : "border border-outline-variant/50 bg-surface-lowest text-on-surface-variant hover:bg-surface-low",
              )}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      <FieldShell id="fasilitas-studio" label="Fasilitas Studio" aside={`${values.fasilitas.length} dipilih`}>
        <div id="fasilitas-studio" role="group" tabIndex={-1} className="grid grid-cols-1 gap-3 outline-none sm:grid-cols-2">
          {FASILITAS_STUDIO.map((fasilitas) => {
            const active = values.fasilitas.includes(fasilitas);
            const Icon = FASILITAS_ICON[fasilitas];
            return (
              <button
                key={fasilitas}
                type="button"
                aria-pressed={active}
                onClick={() => toggleFasilitas(fasilitas)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition",
                  active
                    ? "border-secondary bg-secondary-container/50 text-on-surface"
                    : "border-outline-variant/40 bg-surface-lowest text-on-surface-variant hover:bg-surface-low",
                )}
              >
                <Icon className={cn("size-4 shrink-0", active ? "text-secondary" : "text-on-surface-variant")} aria-hidden />
                <span className="min-w-0 flex-1">{fasilitas}</span>
                {active && <Check className="size-4 shrink-0 text-secondary" aria-hidden />}
              </button>
            );
          })}
        </div>
      </FieldShell>
    </FormSection>
  );
}
