import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "tonal" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary shadow-primary hover:brightness-110",
  secondary: "bg-secondary text-on-secondary hover:brightness-110",
  tonal: "bg-surface-high text-on-surface hover:bg-surface-highest",
  outline: "bg-surface-lowest text-primary border border-outline-variant/60 hover:bg-surface-low",
  ghost: "text-on-surface-variant hover:bg-surface-container",
  danger: "bg-error-container text-error hover:brightness-95",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[11px] leading-[14px] gap-1 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-5 text-base gap-2 rounded-xl",
};

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function buttonClasses({ variant = "primary", size = "md", fullWidth }: ButtonStyleProps, className?: string) {
  return cn(
    "inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap transition",
    "disabled:pointer-events-none disabled:opacity-60",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth && "w-full",
    className,
  );
}

type ButtonProps = ComponentProps<"button"> & ButtonStyleProps & { isLoading?: boolean };

export function Button({ variant, size, fullWidth, isLoading, className, children, disabled, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, fullWidth }, className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading && <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />}
      {children}
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & ButtonStyleProps;

export function ButtonLink({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses({ variant, size, fullWidth }, className)} {...props} />;
}

type IconButtonProps = ComponentProps<"button"> & { label: string; tone?: "surface" | "primary" | "secondary" | "danger" };

const ICON_TONES = {
  surface: "bg-surface-low text-on-surface-variant hover:bg-surface-high",
  primary: "bg-primary text-on-primary hover:brightness-110",
  secondary: "bg-secondary-container text-secondary hover:brightness-95",
  danger: "bg-error-container text-error hover:brightness-95",
};

/** Tombol ikon bulat/kotak dengan label aksesibel (dipakai di header & kolom aksi tabel). */
export function IconButton({ label, tone = "surface", className, type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn("inline-flex size-9 shrink-0 items-center justify-center rounded-full transition", ICON_TONES[tone], className)}
      {...props}
    />
  );
}
