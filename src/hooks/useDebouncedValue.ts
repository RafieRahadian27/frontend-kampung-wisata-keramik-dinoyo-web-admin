"use client";

import { useEffect, useState } from "react";

/** Menunda perubahan nilai (misal kata kunci pencarian) agar filter tidak dihitung tiap ketikan. */
export function useDebouncedValue<T>(value: T, delayMs = 250): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
