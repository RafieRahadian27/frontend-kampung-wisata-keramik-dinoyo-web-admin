"use server";

import { updateTag } from "next/cache";
import type { CacheTag } from "@/lib/api/config";

/**
 * Server Action: kosongkan cache untuk tag tertentu setelah mutasi data
 * agar halaman berikutnya langsung menampilkan data terbaru (read-your-own-writes).
 */
export async function invalidateCache(tags: CacheTag[]) {
  tags.forEach((tag) => updateTag(tag));
}
