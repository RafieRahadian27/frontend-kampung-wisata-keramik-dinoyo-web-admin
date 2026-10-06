"use client";

import type { ComponentProps } from "react";
import { useToast } from "@/context/ToastContext";
import { Button } from "./Button";

type ToastButtonProps = Omit<ComponentProps<typeof Button>, "onClick"> & { message: string };

/**
 * Tombol untuk fitur yang belum memiliki endpoint (ekspor, unduh, dsb.) —
 * memberi umpan balik lewat toast. Bisa dipakai langsung dari Server Component.
 */
export function ToastButton({ message, ...props }: ToastButtonProps) {
  const { showToast } = useToast();
  return <Button onClick={() => showToast(message, "info")} {...props} />;
}
