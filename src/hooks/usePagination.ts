"use client";

import { useMemo, useState } from "react";

/** Memotong daftar menjadi halaman-halaman dan menyediakan state halaman aktif. */
export function usePagination<T>(items: T[], pageSize: number) {
  const [requestedPage, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  // Jika filter mengurangi jumlah data, halaman aktif otomatis dijepit ke halaman terakhir.
  const page = Math.min(requestedPage, totalPages);

  const pageItems = useMemo(() => items.slice((page - 1) * pageSize, page * pageSize), [items, page, pageSize]);
  const rangeStart = items.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, items.length);

  return { page, setPage, totalPages, pageItems, rangeStart, rangeEnd };
}
