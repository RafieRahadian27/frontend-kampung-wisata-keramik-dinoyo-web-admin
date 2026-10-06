"use client";

import { RefreshCw, ServerCrash } from "lucide-react";
import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface ErrorPanelProps {
  error: Error & { digest?: string };
  onRetry: () => void;
}

export function ErrorPanel({ error, onRetry }: ErrorPanelProps) {
  useEffect(() => {
    console.error("[Dinoyo Admin]", error);
  }, [error]);

  return (
    <Card className="mx-auto mt-6 flex max-w-xl flex-col items-center gap-4 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-error-container text-error">
        <ServerCrash className="size-7" aria-hidden />
      </span>
      <h1 className="font-serif text-2xl font-bold text-on-surface">Data gagal dimuat</h1>
      <p className="text-sm leading-[22px] text-on-surface-variant">
        Panel tidak dapat terhubung ke server API paguyuban. Pastikan backend Express sudah berjalan di{" "}
        <code className="rounded bg-surface-container px-1.5 py-0.5 text-xs">localhost:4000</code>, lalu coba lagi.
      </p>
      {error.digest && <p className="text-[11px] text-on-surface-variant">Kode galat: {error.digest}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={onRetry}>
          <RefreshCw className="size-4" aria-hidden />
          Coba Lagi
        </Button>
        <ButtonLink href="/dashboard" variant="tonal">
          Ke Dashboard
        </ButtonLink>
      </div>
    </Card>
  );
}
