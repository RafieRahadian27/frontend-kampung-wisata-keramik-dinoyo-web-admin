"use client";

import { ChevronDown } from "lucide-react";
import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const CONTROL_BASE =
  "w-full rounded-xl bg-surface-low text-sm text-on-surface placeholder:text-on-surface-variant/70 outline-none transition " +
  "border border-transparent focus:border-primary/40 focus:bg-surface-lowest focus:ring-2 focus:ring-primary/15";

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: ReactNode;
  aside?: ReactNode;
  error?: string;
  children: ReactNode;
  className?: string;
  /** `md` = label 16px reguler (halaman login), `sm` = label 12px tebal (formulir data). */
  labelSize?: "sm" | "md";
}

const LABEL_SIZE = {
  sm: "text-xs leading-4 font-semibold",
  md: "text-base leading-6 font-normal",
};

/** Bungkus label + kontrol + pesan bantuan/eror agar semua input konsisten. */
export function FieldShell({ id, label, required, hint, aside, error, children, className, labelSize = "sm" }: FieldShellProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <div className="flex items-end justify-between gap-3">
        <label htmlFor={id} className={cn("text-on-surface", LABEL_SIZE[labelSize])}>
          {label}
          {required && <span className="ml-1 text-primary">*</span>}
        </label>
        {aside && <span className="text-[11px] leading-[14px] text-on-surface-variant">{aside}</span>}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[11px] leading-[14px] font-semibold text-error">
          {error}
        </p>
      ) : (
        hint && <p className="text-[11px] leading-[14px] font-semibold text-on-surface-variant">{hint}</p>
      )}
    </div>
  );
}

type TextFieldProps = Omit<ComponentProps<"input">, "id"> & {
  label: string;
  hint?: ReactNode;
  aside?: ReactNode;
  error?: string;
  leadingIcon?: ReactNode;
  trailing?: ReactNode;
  containerClassName?: string;
  labelSize?: FieldShellProps["labelSize"];
};

export function TextField({
  label,
  hint,
  aside,
  error,
  leadingIcon,
  trailing,
  required,
  className,
  containerClassName,
  labelSize,
  ...props
}: TextFieldProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} aside={aside} error={error} className={containerClassName} labelSize={labelSize}>
      <div className="relative">
        {leadingIcon && (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-on-surface-variant [&_svg]:size-4">
            {leadingIcon}
          </span>
        )}
        <input
          id={id}
          required={required}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            CONTROL_BASE,
            "h-11 px-4",
            Boolean(leadingIcon) && "pl-11",
            Boolean(trailing) && "pr-24",
            error && "border-error/60 bg-error-container/30",
            className,
          )}
          {...props}
        />
        {trailing && <span className="absolute top-1/2 right-3 -translate-y-1/2">{trailing}</span>}
      </div>
    </FieldShell>
  );
}

type SelectFieldProps = Omit<ComponentProps<"select">, "id"> & {
  label: string;
  options: string[];
  hint?: ReactNode;
  error?: string;
};

export function SelectField({ label, options, hint, error, required, className, ...props }: SelectFieldProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <div className="relative">
        <select id={id} required={required} className={cn(CONTROL_BASE, "h-11 cursor-pointer appearance-none truncate px-4 pr-10", className)} {...props}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-on-surface-variant" aria-hidden />
      </div>
    </FieldShell>
  );
}

export const controlBaseClass = CONTROL_BASE;
