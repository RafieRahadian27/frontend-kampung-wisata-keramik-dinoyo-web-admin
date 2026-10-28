"use client";

import { Bold, BookOpen, Italic, Lightbulb, Link2, List, Quote, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { FormSection } from "@/components/ui/FormSection";
import { MAX_DESKRIPSI } from "./formConfig";

interface ToolbarAction {
  label: string;
  icon: LucideIcon;
  before: string;
  after?: string;
}

const TOOLBAR: ToolbarAction[] = [
  { label: "Tebal", icon: Bold, before: "**", after: "**" },
  { label: "Miring", icon: Italic, before: "_", after: "_" },
  { label: "Kutipan", icon: Quote, before: "> " },
  { label: "Daftar", icon: List, before: "- " },
  { label: "Tautan", icon: Link2, before: "[", after: "](https://)" },
];

interface NarrativeSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function NarrativeSection({ value, onChange }: NarrativeSectionProps) {
  // useRef memberi akses langsung ke <textarea> (posisi kursor/seleksi) tanpa render ulang.
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = ({ before, after = "" }: ToolbarAction) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { selectionStart, selectionEnd } = textarea;
    const selectedText = value.slice(selectionStart, selectionEnd);
    const nextValue = value.slice(0, selectionStart) + before + selectedText + after + value.slice(selectionEnd);
    onChange(nextValue.slice(0, MAX_DESKRIPSI));

    // Kembalikan fokus & seleksi setelah React memperbarui nilai textarea.
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(selectionStart + before.length, selectionEnd + before.length);
    });
  };

  return (
    <FormSection
      title="Deskripsi & Filosofi Kriya"
      description="Cerita dapur pembakaran, teknik roda putar, dan karakter glasir lokal"
      icon={<BookOpen />}
      aside={<span className="hidden text-overline text-on-surface-variant sm:block">Editor Narasi</span>}
    >
      <div className="overflow-hidden rounded-xl bg-surface-low focus-within:ring-2 focus-within:ring-primary/15">
        <div className="flex items-center justify-between gap-2 border-b border-outline-variant/30 bg-surface-container px-3 py-2">
          <div className="flex items-center gap-1" role="toolbar" aria-label="Format teks">
            {TOOLBAR.map((action, index) => (
              <span key={action.label} className="flex items-center">
                {index === 3 && <span className="mx-1 h-4 w-px bg-outline-variant" aria-hidden />}
                <button
                  type="button"
                  onClick={() => applyFormat(action)}
                  aria-label={action.label}
                  title={action.label}
                  className="inline-flex size-8 items-center justify-center rounded-lg text-on-surface transition hover:bg-surface-high"
                >
                  <action.icon className="size-4" aria-hidden />
                </button>
              </span>
            ))}
          </div>
          <span className="text-[11px] font-semibold text-on-surface-variant">{value.length} karakter</span>
        </div>
        <label htmlFor="deskripsi-toko" className="sr-only">
          Deskripsi toko
        </label>
        <textarea
          id="deskripsi-toko"
          ref={textareaRef}
          rows={7}
          maxLength={MAX_DESKRIPSI}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ceritakan sejarah studio, teknik pembakaran, dan karakter karya Anda…"
          className="block w-full resize-y bg-transparent px-4 py-4 text-sm leading-[23px] text-on-surface outline-none placeholder:text-on-surface-variant/70 sm:text-base sm:leading-[26px]"
        />
      </div>

      <p className="flex items-start gap-3 rounded-xl bg-surface-container p-4 text-xs leading-[18px] text-on-surface-variant">
        <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <span>
          <strong className="font-semibold text-on-surface">Saran Kuratorial:</strong> Tuliskan bagaimana teknik pembakaran (bisque &amp;
          glirir) serta kehangatan interaksi langsung di studio Anda menarik wisatawan dan pembeli kolektor.
        </span>
      </p>
    </FormSection>
  );
}
