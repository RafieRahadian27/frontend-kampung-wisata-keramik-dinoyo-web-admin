"use client";

import { useEffect } from "react";

/** Memperbarui judul tab browser secara dinamis (side effect) dari Client Component. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
