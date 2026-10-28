"use client";

import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { SelectField, TextField } from "@/components/ui/FormField";
import { PORTAL_PUBLIK_URL } from "@/constants/navigation";
import { useToast } from "@/context/ToastContext";
import { register } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";
import {
  digitsOnly,
  passwordStrength,
  requiredText,
  UMUR_MAX,
  UMUR_MIN,
  validateEmail,
  validateNama,
  validateNik,
  validatePassword,
  validateUmur,
  validateUsername,
  validateWhatsapp,
} from "@/lib/validation";
import type { PeranAkun } from "@/types";

const PERAN: PeranAkun[] = ["Pemilik Toko", "Staf Pengrajin"];

interface RegisterValues {
  nama: string;
  umur: string;
  nik: string;
  whatsapp: string;
  toko: string;
  lokasi: string;
  peran: PeranAkun;
  username: string;
  email: string;
  password: string;
  konfirmasi: string;
}

type FieldName = keyof RegisterValues;
type FormErrors = Partial<Record<FieldName | "setuju" | "form", string>>;

const INITIAL: RegisterValues = {
  nama: "",
  umur: "",
  nik: "",
  whatsapp: "",
  toko: "",
  lokasi: "",
  peran: "Pemilik Toko",
  username: "",
  email: "",
  password: "",
  konfirmasi: "",
};

/** Urutan = urutan tampil, dipakai untuk memfokuskan kolom pertama yang salah. */
const VALIDATORS: Record<FieldName, (value: string, values: RegisterValues) => string | undefined> = {
  nama: validateNama,
  umur: validateUmur,
  whatsapp: validateWhatsapp,
  nik: validateNik,
  toko: requiredText("Nama toko", 3, 100),
  lokasi: requiredText("Lokasi toko", 5, 100),
  peran: (value) => (PERAN.includes(value as PeranAkun) ? undefined : "Pilih peran Anda."),
  username: validateUsername,
  email: validateEmail,
  password: validatePassword,
  konfirmasi: (value, values) => {
    if (!value) return "Ulangi kata sandi Anda.";
    if (value !== values.password) return "Konfirmasi kata sandi tidak sama.";
    return undefined;
  },
};

/** Kolom yang hanya menerima angka beserta panjang maksimalnya. */
const DIGIT_FIELDS: Partial<Record<FieldName, number>> = { umur: 3, nik: 16, whatsapp: 14 };

const STRENGTH = [
  { label: "", bar: "" },
  { label: "Lemah", bar: "bg-error w-1/4" },
  { label: "Cukup", bar: "bg-tertiary w-2/4" },
  { label: "Kuat", bar: "bg-secondary w-3/4" },
  { label: "Sangat kuat", bar: "bg-secondary w-full" },
] as const;

function validateAll(values: RegisterValues, setuju: boolean): FormErrors {
  const errors: FormErrors = {};
  for (const field of Object.keys(VALIDATORS) as FieldName[]) {
    const message = VALIDATORS[field](values[field], values);
    if (message) errors[field] = message;
  }
  if (!setuju) errors.setuju = "Centang persetujuan untuk melanjutkan.";
  return errors;
}

function FormGroup({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <fieldset className="flex min-w-0 flex-col gap-5">
      <legend className="mb-1">
        <span className="block text-overline text-primary">{title}</span>
        <span className="mt-1 block text-xs leading-4 text-on-surface-variant">{description}</span>
      </legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<RegisterValues>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  // Kolom baru divalidasi langsung setelah pernah ditinggalkan (blur) agar tidak "memarahi" saat baru mengetik.
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [setuju, setSetuju] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const setFieldError = (field: FieldName, message: string | undefined) =>
    setErrors((current) => (current[field] === message ? current : { ...current, [field]: message }));

  const handleChange = (field: FieldName) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = event.target.value;
    let warning: string | undefined;

    const maxDigits = DIGIT_FIELDS[field];
    if (maxDigits) {
      // Spasi, tanda hubung, dan "+" pada nomor WhatsApp dibuang tanpa peringatan; huruf tetap ditolak.
      const raw = field === "whatsapp" ? value.replace(/[\s+-]/g, "") : value;
      const result = digitsOnly(raw, maxDigits);
      if (result.rejected) warning = VALIDATORS[field](raw, values);
      value = result.value;
    }
    if (field === "username" || field === "email") value = value.toLowerCase();

    const next = { ...values, [field]: value };
    setValues(next);

    if (warning) setFieldError(field, warning);
    else if (touched[field] || errors[field]) setFieldError(field, VALIDATORS[field](value, next));
    // Konfirmasi ikut dinilai ulang ketika kata sandi utama berubah.
    if (field === "password" && (touched.konfirmasi || errors.konfirmasi)) {
      setFieldError("konfirmasi", VALIDATORS.konfirmasi(next.konfirmasi, next));
    }
  };

  const handleBlur = (field: FieldName) => () => {
    setTouched((current) => ({ ...current, [field]: true }));
    setFieldError(field, VALIDATORS[field](values[field], values));
  };

  const fieldProps = (field: FieldName) => ({
    name: field,
    value: values[field],
    onChange: handleChange(field),
    onBlur: handleBlur(field),
    error: errors[field],
    required: true,
    labelSize: "sm" as const,
  });

  const focusFirstError = () =>
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateAll(values, setuju);
    setErrors(validationErrors);
    setTouched(Object.fromEntries(Object.keys(VALIDATORS).map((field) => [field, true])));
    if (Object.keys(validationErrors).length > 0) {
      showToast("Periksa kembali kolom yang ditandai merah.", "error");
      focusFirstError();
      return;
    }

    setSubmitting(true);
    try {
      const result = await register({
        nama: values.nama.trim(),
        umur: Number(values.umur),
        nik: values.nik,
        whatsapp: values.whatsapp,
        toko: values.toko.trim(),
        lokasi: values.lokasi.trim(),
        peran: values.peran,
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      if (!result.ok) {
        const hasFieldErrors = Object.keys(result.fieldErrors).length > 0;
        setErrors({ ...result.fieldErrors, form: hasFieldErrors ? undefined : result.message });
        if (hasFieldErrors) focusFirstError();
        setSubmitting(false);
        return;
      }
      router.replace("/login?daftar=berhasil");
    } catch {
      setErrors({ form: "Server tidak dapat dihubungi. Coba lagi." });
      setSubmitting(false);
    }
  };

  const strength = passwordStrength(values.password);

  return (
    <div className="w-full max-w-2xl rounded-3xl bg-surface-lowest p-5 shadow-float sm:p-10">
      <h2 className="font-serif text-base leading-6 font-bold text-on-surface">Daftar Akun Pengrajin</h2>
      <p className="mt-2 text-sm leading-[22px] text-on-surface-variant sm:text-base sm:leading-6">
        Lengkapi data di bawah ini. Akun bisa dipakai setelah diverifikasi admin paguyuban.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-8">
        {errors.form && (
          <p role="alert" className="rounded-xl bg-error-container px-4 py-3 text-sm font-semibold text-error">
            {errors.form}
          </p>
        )}

        <FormGroup title="Data Diri" description="Sesuai KTP pemilik atau staf toko.">
          <TextField
            {...fieldProps("nama")}
            label="Nama Lengkap"
            autoComplete="name"
            placeholder="cth. Siti Aminah"
            containerClassName="sm:col-span-2"
          />
          <TextField
            {...fieldProps("umur")}
            label="Umur"
            inputMode="numeric"
            autoComplete="off"
            placeholder="cth. 37"
            hint={`Hanya angka, ${UMUR_MIN}–${UMUR_MAX} tahun.`}
            aside="tahun"
          />
          <TextField
            {...fieldProps("whatsapp")}
            label="Nomor WhatsApp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="081234567890"
            hint="Diawali 08 atau 628."
          />
          <TextField
            {...fieldProps("nik")}
            label="NIK"
            inputMode="numeric"
            autoComplete="off"
            placeholder="16 digit sesuai KTP"
            aside={`${values.nik.length}/16`}
            containerClassName="sm:col-span-2"
          />
        </FormGroup>

        <FormGroup title="Data Toko" description="Toko atau sanggar tempat Anda berkarya.">
          <TextField
            {...fieldProps("toko")}
            label="Nama Toko / Sanggar"
            autoComplete="organization"
            placeholder="cth. Sanggar Keramik Aminah"
            containerClassName="sm:col-span-2"
          />
          <TextField {...fieldProps("lokasi")} label="Lokasi Toko" autoComplete="street-address" placeholder="cth. Gg. IX No. 21" />
          <SelectField
            name="peran"
            label="Peran"
            required
            options={PERAN}
            value={values.peran}
            onChange={handleChange("peran")}
            onBlur={handleBlur("peran")}
            error={errors.peran}
          />
        </FormGroup>

        <FormGroup title="Akun Masuk" description="Dipakai untuk masuk ke panel pengelolaan.">
          <TextField
            {...fieldProps("username")}
            label="Username"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="cth. siti_aminah"
            hint="4–20 karakter: huruf, angka, atau _."
          />
          <TextField
            {...fieldProps("email")}
            label="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="air123@gmail.com"
          />
          <div className="flex min-w-0 flex-col gap-2">
            <TextField
              {...fieldProps("password")}
              label="Kata Sandi"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Min. 8 karakter"
              hint="Gabungan huruf dan angka, tanpa spasi."
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="rounded-lg px-2 py-1 text-xs font-semibold text-primary hover:bg-primary-fixed/50"
                  aria-pressed={showPassword}
                >
                  {showPassword ? "Sembunyikan" : "Tampilkan"}
                </button>
              }
            />
            {strength > 0 && (
              <div className="flex items-center gap-3" aria-live="polite">
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-high">
                  <span className={cn("block h-full rounded-full transition-[width] duration-300", STRENGTH[strength].bar)} />
                </span>
                <span className="w-20 text-right text-[11px] leading-[14px] font-semibold text-on-surface-variant">
                  {STRENGTH[strength].label}
                </span>
              </div>
            )}
          </div>
          <TextField
            {...fieldProps("konfirmasi")}
            label="Ulangi Kata Sandi"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Ketik ulang kata sandi"
          />
        </FormGroup>

        <div className="flex flex-col gap-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-[22px] text-on-surface">
            <input
              type="checkbox"
              name="setuju"
              checked={setuju}
              onChange={(event) => {
                setSetuju(event.target.checked);
                if (event.target.checked) setErrors((current) => ({ ...current, setuju: undefined }));
              }}
              aria-invalid={Boolean(errors.setuju) || undefined}
              aria-describedby={errors.setuju ? "setuju-error" : undefined}
              className="mt-1 size-4 shrink-0 cursor-pointer rounded border-outline accent-primary"
            />
            Saya menyatakan data di atas benar dan bersedia diverifikasi oleh admin paguyuban Kampung Keramik Dinoyo.
          </label>
          {errors.setuju && (
            <p id="setuju-error" className="pl-7 text-[11px] leading-[14px] font-semibold text-error">
              {errors.setuju}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" fullWidth isLoading={isSubmitting} className="h-[52px]">
          {!isSubmitting && <UserPlus className="size-4" aria-hidden />}
          Daftar Sekarang
        </Button>
      </form>

      <p className="mt-8 text-center text-sm leading-[22px] text-on-surface-variant sm:text-base">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Masuk di sini
        </Link>
      </p>
      <a href={PORTAL_PUBLIK_URL} className="mt-4 flex items-center justify-center gap-2 text-sm text-primary hover:underline sm:text-base">
        <ArrowLeft className="size-4" aria-hidden />
        Kembali ke situs
      </a>
    </div>
  );
}
