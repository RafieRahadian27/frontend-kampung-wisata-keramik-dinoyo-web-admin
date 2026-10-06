"use client";

import { Save, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useToast } from "@/context/ToastContext";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { invalidateCache } from "@/lib/actions/cache";
import { tokoApi } from "@/lib/api/client";
import { CACHE_TAGS } from "@/lib/api/config";
import type { TokoFormValues } from "@/types";
import { ContactSection } from "./ContactSection";
import { FormActionBar } from "./FormActionBar";
import { IdentitySection } from "./IdentitySection";
import { LocationSection } from "./LocationSection";
import { MediaSection } from "./MediaSection";
import { NarrativeSection } from "./NarrativeSection";
import { StatusSection } from "./StatusSection";
import { validateTokoForm, type TokoFormErrors } from "./formConfig";

interface TokoFormProps {
  mode: "create" | "edit";
  initialValues: TokoFormValues;
  slug?: string;
  coverPhoto?: string;
  lastSaved?: string;
}

export type UpdateField = <K extends keyof TokoFormValues>(field: K, value: TokoFormValues[K]) => void;

/**
 * Formulir toko (tambah & edit). Seluruh nilai form disimpan dalam satu state `values`
 * lalu dibagikan ke setiap seksi (child) beserta fungsi `updateField` lewat props.
 */
export function TokoForm({ mode, initialValues, slug, coverPhoto, lastSaved }: TokoFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<TokoFormValues>(initialValues);
  const [errors, setErrors] = useState<TokoFormErrors>({});
  const [submitting, setSubmitting] = useState<"publish" | "draft" | null>(null);

  const isEdit = mode === "edit";
  useDocumentTitle(values.nama ? `${isEdit ? "Edit" : "Tambah"}: ${values.nama} • Dinoyo Craft Admin` : "Tambah Toko Baru • Dinoyo Craft Admin");

  const isDirty = useMemo(() => JSON.stringify(values) !== JSON.stringify(initialValues), [values, initialValues]);

  const updateField: UpdateField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  const save = async (intent: "publish" | "draft") => {
    const validationErrors = validateTokoForm(values);
    setErrors(validationErrors);
    if (Object.values(validationErrors).some(Boolean)) {
      showToast("Periksa kembali kolom yang ditandai merah.", "error");
      // useRef: arahkan fokus ke field pertama yang bermasalah langsung lewat DOM.
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true'], [data-invalid='true']")?.focus();
      return;
    }

    setSubmitting(intent);
    const payload = { ...values, aktifPublik: intent === "publish" ? values.aktifPublik : false };
    try {
      const response = isEdit && slug ? await tokoApi.update(slug, payload) : await tokoApi.create(payload);
      await invalidateCache([CACHE_TAGS.toko, CACHE_TAGS.dashboard]);
      showToast(intent === "draft" ? "Draf toko tersimpan." : (response.message ?? "Data toko tersimpan."));
      router.push("/toko");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Gagal menyimpan toko", "error");
      setSubmitting(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void save("publish");
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <Breadcrumb
          items={[
            { label: "Kelola Toko", href: "/toko", icon: <Store /> },
            { label: isEdit ? `Edit ${initialValues.nama}` : "Tambah Toko Baru" },
          ]}
        />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <h1 className="font-serif text-[28px] leading-9 font-bold text-on-surface sm:text-[32px] sm:leading-10">
                Formulir Data Toko Pengrajin Dinoyo
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container px-3 py-1 text-[11px] font-semibold text-on-secondary-container">
                <span className="size-1.5 rounded-full bg-secondary" aria-hidden />
                {isEdit ? "Mode Pembaruan Aktif" : "Mode Pendaftaran Baru"}
              </span>
            </div>
            <p className="max-w-2xl text-sm leading-[22px] text-on-surface-variant">
              Lengkapi profil studio keramik, narasi warisan seni, serta detail lokasi lorong untuk katalog terverifikasi Kampung Dinoyo.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button variant="tonal" size="lg" onClick={() => router.back()}>
              Batal
            </Button>
            <Button type="submit" size="lg" isLoading={submitting === "publish"} disabled={submitting !== null}>
              {submitting !== "publish" && <Save className="size-4" aria-hidden />}
              Simpan Toko
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-6">
          <IdentitySection values={values} errors={errors} updateField={updateField} />
          <NarrativeSection value={values.deskripsi} onChange={(deskripsi) => updateField("deskripsi", deskripsi)} />
          <ContactSection values={values} errors={errors} updateField={updateField} />
        </div>
        <div className="flex min-w-0 flex-col gap-6">
          <MediaSection initialCover={coverPhoto} />
          <LocationSection values={values} errors={errors} updateField={updateField} />
          <StatusSection values={values} updateField={updateField} />
        </div>
      </div>

      <FormActionBar
        isDirty={isDirty}
        lastSaved={lastSaved}
        submitting={submitting}
        onSaveDraft={() => void save("draft")}
        onPreview={() => showToast("Pratinjau halaman publik akan dibuka di portal Dinoyo.", "info")}
      />
    </form>
  );
}
