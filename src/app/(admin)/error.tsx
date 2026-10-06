"use client";

import { ErrorPanel } from "@/components/feedback/ErrorPanel";

/**
 * Error boundary untuk konten admin. Jika satu halaman gagal (mis. API Express mati),
 * Sidebar & Header tetap tampil dan pengguna bisa mencoba lagi.
 */
export default function AdminError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <ErrorPanel error={error} onRetry={retry} />;
}
