"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { TextField } from "@/components/ui/FormField";
import { useToast } from "@/context/ToastContext";
import { createSession } from "@/lib/actions/session";
import { authApi } from "@/lib/api/client";
import { PORTAL_PUBLIK_URL } from "@/constants/navigation";

interface LoginFormProps {
  nextPath: string;
  justLoggedOut: boolean;
}

interface FormErrors {
  identifier?: string;
  password?: string;
  form?: string;
}

function validate(identifier: string, password: string): FormErrors {
  const errors: FormErrors = {};
  if (!identifier.trim()) errors.identifier = "Email atau username wajib diisi.";
  if (!password) errors.password = "Kata sandi wajib diisi.";
  else if (password.length < 6) errors.password = "Kata sandi minimal 6 karakter.";
  return errors;
}

export function LoginForm({ nextPath, justLoggedOut }: LoginFormProps) {
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
  // Penanda agar toast logout hanya muncul sekali (efek dijalankan dua kali di Strict Mode).
  const hasAnnouncedLogout = useRef(false);

  useEffect(() => {
    identifierRef.current?.focus();
    if (justLoggedOut && !hasAnnouncedLogout.current) {
      hasAnnouncedLogout.current = true;
      showToast("Anda telah keluar dari panel admin.", "info");
    }
  }, [justLoggedOut, showToast]);

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
      const { data } = await authApi.login(identifier, password);
      await createSession(data.token, data.user, remember);
      showToast(`Selamat datang, ${data.user.sapaan}!`);
      router.replace(nextPath);
      router.refresh();
    } catch (error) {
      const message = error instanceof Error && error.message !== "Failed to fetch" ? error.message : "Server API tidak dapat dihubungi.";
      setErrors({ form: message });
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
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
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
          onChange={(event) => setPassword(event.target.value)}
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
        Belum punya akun? Akun pengrajin dibuat oleh admin paguyuban. Hubungi Kontak Umum Kampung.
      </p>
      <a href={PORTAL_PUBLIK_URL} className="mt-4 flex items-center justify-center gap-2 text-base text-primary hover:underline">
        <ArrowLeft className="size-4" aria-hidden />
        Kembali ke situs
      </a>
      <p className="mt-6 rounded-xl bg-surface-low px-4 py-3 text-center text-xs leading-[18px] text-on-surface-variant">
        Akun demo: <strong className="text-on-surface">admin@keramikdinoyo.id</strong> / <strong className="text-on-surface">dinoyo123</strong>
      </p>
    </div>
  );
}
