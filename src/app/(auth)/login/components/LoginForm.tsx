"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { TextField } from "@/components/ui/FormField";
import { useToast } from "@/context/ToastContext";
import { login } from "@/lib/actions/auth";
import { PORTAL_PUBLIK_URL } from "@/constants/navigation";
import { validateLoginIdentifier } from "@/lib/validation";

interface LoginFormProps {
  nextPath: string;
  justLoggedOut: boolean;
  sessionExpired: boolean;
  justRegistered: boolean;
}

interface FormErrors {
  identifier?: string;
  password?: string;
  form?: string;
}

const validateLoginPassword = (password: string) => {
  if (!password) return "Kata sandi wajib diisi.";
  if (password.length < 6) return "Kata sandi minimal 6 karakter.";
  return undefined;
};

function validate(identifier: string, password: string): FormErrors {
  const errors: FormErrors = {};
  const identifierError = validateLoginIdentifier(identifier);
  const passwordError = validateLoginPassword(password);
  if (identifierError) errors.identifier = identifierError;
  if (passwordError) errors.password = passwordError;
  return errors;
}

export function LoginForm({ nextPath, justLoggedOut, sessionExpired, justRegistered }: LoginFormProps) {
  const router = useRouter();
  const { showToast } = useToast();

  // State form dikendalikan useState (controlled inputs).
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setSubmitting] = useState(false);

  // useRef: fokus otomatis ke input pertama tanpa memicu render ulang.
  const identifierRef = useRef<HTMLInputElement>(null);
  // Penanda agar toast hanya muncul sekali (efek dijalankan dua kali di Strict Mode).
  const hasAnnounced = useRef(false);

  useEffect(() => {
    identifierRef.current?.focus();
    if (hasAnnounced.current) return;
    if (justLoggedOut) {
      hasAnnounced.current = true;
      showToast("Anda telah keluar dari panel admin.", "info");
    } else if (sessionExpired) {
      hasAnnounced.current = true;
      showToast("Sesi Anda berakhir. Silakan masuk kembali.", "info");
    } else if (justRegistered) {
      hasAnnounced.current = true;
      showToast("Pendaftaran berhasil. Akun bisa dipakai setelah diaktifkan admin paguyuban.");
    }
  }, [justLoggedOut, sessionExpired, justRegistered, showToast]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(identifier, password);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.identifier) identifierRef.current?.focus();
      return;
    }

    setSubmitting(true);
    try {
      // Server Action: kredensial diverifikasi Express, token disimpan sebagai cookie HttpOnly.
      const result = await login({ identifier, password, remember, next: nextPath });
      if (!result.ok) {
        setErrors({ form: result.message });
        setSubmitting(false);
        return;
      }
      showToast(`Selamat datang, ${result.sapaan}!`);
      router.replace(result.redirectTo);
      router.refresh();
    } catch {
      setErrors({ form: "Server tidak dapat dihubungi. Coba lagi." });
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-surface-lowest p-6 shadow-float sm:p-10">
      <h2 className="font-serif text-base leading-6 font-bold text-on-surface">Masuk ke Panel Pengelolaan</h2>
      <p className="mt-2 text-base leading-6 text-on-surface-variant">Khusus admin paguyuban dan pengrajin terdaftar.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-6">
        {errors.form && (
          <p role="alert" className="rounded-xl bg-error-container px-4 py-3 text-sm font-semibold text-error">
            {errors.form}
          </p>
        )}

        <TextField
          ref={identifierRef}
          label="Email atau Username"
          labelSize="md"
          name="identifier"
          autoComplete="username"
          placeholder="nama@email.com"
          autoCapitalize="none"
          spellCheck={false}
          value={identifier}
          onChange={(event) => {
            setIdentifier(event.target.value);
            if (errors.identifier) setErrors((current) => ({ ...current, identifier: validateLoginIdentifier(event.target.value) }));
          }}
          onBlur={() => identifier && setErrors((current) => ({ ...current, identifier: validateLoginIdentifier(identifier) }))}
          error={errors.identifier}
        />

        <TextField
          label="Kata Sandi"
          labelSize="md"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Masukkan kata sandi"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            if (errors.password) setErrors((current) => ({ ...current, password: validateLoginPassword(event.target.value) }));
          }}
          error={errors.password}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="rounded-lg px-2 py-1 text-base text-primary hover:bg-primary-fixed/50"
              aria-pressed={showPassword}
            >
              {showPassword ? "Sembunyikan" : "Tampilkan"}
            </button>
          }
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Checkbox label="Ingat saya" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="text-base" />
          <button
            type="button"
            className="text-base text-primary hover:underline"
            onClick={() => showToast("Hubungi sekretariat paguyuban untuk mengatur ulang kata sandi.", "info")}
          >
            Lupa kata sandi?
          </button>
        </div>

        <Button type="submit" size="lg" fullWidth isLoading={isSubmitting} className="h-[52px]">
          Masuk
          {!isSubmitting && <ArrowRight className="size-4" aria-hidden />}
        </Button>
      </form>

      <p className="mt-10 text-center text-base leading-[26px] text-on-surface-variant">
        Belum punya akun?{" "}
        <Link href="/daftar" className="font-semibold text-primary hover:underline">
          Daftar sebagai pengrajin
        </Link>
      </p>
      <a href={PORTAL_PUBLIK_URL} className="mt-4 flex items-center justify-center gap-2 text-base text-primary hover:underline">
        <ArrowLeft className="size-4" aria-hidden />
        Kembali ke situs
      </a>
      <p className="mt-6 rounded-xl bg-surface-low px-4 py-3 text-center text-xs leading-[18px] text-on-surface-variant">
        Akun demo admin: <strong className="text-on-surface">admin</strong> / <strong className="text-on-surface">dinoyo123</strong>
        <br />
        Pemilik toko: <strong className="text-on-surface">bambang</strong> / <strong className="text-on-surface">sariasih123</strong>
      </p>
    </div>
  );
}
