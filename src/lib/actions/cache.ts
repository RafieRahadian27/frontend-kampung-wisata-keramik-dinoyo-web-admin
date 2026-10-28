"use server";

import { updateTag } from "next/cache";
import type { CacheTag } from "@/lib/api/config";
import { verifySession } from "@/lib/dal";

/**
 * Server Action: kosongkan cache untuk tag tertentu setelah mutasi data
 * agar halaman berikutnya langsung menampilkan data terbaru (read-your-own-writes).
 * Server Action bisa dipanggil siapa saja lewat HTTP, jadi tetap wajib login.
 */
export async function invalidateCache(tags: CacheTag[]) {
  await verifySession();
  tags.forEach((tag) => updateTag(tag));
}
