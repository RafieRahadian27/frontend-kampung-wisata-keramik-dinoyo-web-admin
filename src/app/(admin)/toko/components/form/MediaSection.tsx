"use client";

import { CircleCheck, ImagePlus, RefreshCw, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { FormSection } from "@/components/ui/FormSection";

interface CoverFile {
  url: string;
  name: string;
  sizeLabel: string;
}

const DEFAULT_COVER: CoverFile = { url: "/images/sampul-galeri.jpg", name: "sampul-galeri-utama.webp", sizeLabel: "1920 × 1080 px • 1.4 MB" };

function formatSize(bytes: number) {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

export function MediaSection({ initialCover }: { initialCover?: string }) {
  const [cover, setCover] = useState<CoverFile>(initialCover ? { ...DEFAULT_COVER, url: initialCover } : DEFAULT_COVER);
  const [stempelName, setStempelName] = useState("stempel-sari-asih.svg");

  // useRef ke <input type="file"> tersembunyi — dibuka lewat tombol kustom.
  const coverInputRef = useRef<HTMLInputElement>(null);
  const stempelInputRef = useRef<HTMLInputElement>(null);

  // Bersihkan object URL lama agar tidak bocor memori.
  useEffect(() => {
    return () => {
      if (cover.url.startsWith("blob:")) URL.revokeObjectURL(cover.url);
    };
  }, [cover.url]);

  const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setCover({ url: URL.createObjectURL(file), name: file.name, sizeLabel: formatSize(file.size) });
  };

  const handleStempelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setStempelName(file.name);
  };

  return (
    <FormSection title="Media Galeri" description="Foto sampul workshop dan stempel monogram" icon={<ImagePlus />}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-on-surface">
            Foto Sampul Workshop / Gerai <span className="text-primary">*</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-secondary">
            <CircleCheck className="size-3.5" aria-hidden />
            Terunggah
          </span>
        </div>
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-surface-high">
          <Image src={cover.url} alt="Pratinjau foto sampul" fill sizes="(min-width: 1280px) 320px, 100vw" className="object-cover" loading="eager" unoptimized={cover.url.startsWith("blob:")} />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-linear-to-t from-black/70 to-transparent p-4">
            <div className="min-w-0 text-white">
              <p className="truncate text-xs font-semibold">{cover.name}</p>
              <p className="text-[11px] text-white/80">{cover.sizeLabel}</p>
            </div>
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition hover:bg-black/60"
            >
              <RefreshCw className="size-3.5" aria-hidden />
              Ganti
            </button>
          </div>
        </div>
        <input ref={coverInputRef} type="file" accept="image/*" className="sr-only" onChange={handleCoverChange} tabIndex={-1} aria-label="Unggah foto sampul" />
        <p className="text-xs leading-[18px] text-on-surface-variant">
          Rekomendasi rasio 16:9 landscape. Resolusi tajam dengan pencahayaan alami studio.
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-xl bg-surface-container p-4">
        <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-surface-high">
          <Image src="/images/stempel-paguyuban.jpg" alt="Stempel paguyuban" fill sizes="64px" className="object-cover" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-on-surface">{stempelName}</p>
          <p className="text-xs leading-[18px] text-on-surface-variant">Stempel otentikasi kriya (rasio 1:1)</p>
        </div>
        <button
          type="button"
          onClick={() => stempelInputRef.current?.click()}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-surface-lowest px-3 py-2 text-xs font-semibold text-on-surface shadow-card transition hover:bg-surface-low"
        >
          <Upload className="size-3.5" aria-hidden />
          Unggah
        </button>
        <input ref={stempelInputRef} type="file" accept="image/*,.svg" className="sr-only" onChange={handleStempelChange} tabIndex={-1} aria-label="Unggah stempel" />
      </div>
    </FormSection>
  );
}
