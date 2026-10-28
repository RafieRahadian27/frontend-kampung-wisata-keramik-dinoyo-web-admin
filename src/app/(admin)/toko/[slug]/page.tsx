import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api/config";
import { getToko } from "@/lib/api/server";
import { requirePermission } from "@/lib/dal";
import { TokoForm } from "../components/form/TokoForm";
import { toFormValues } from "../components/form/formConfig";

/** Ambil toko berdasarkan slug; 404 dari API diteruskan ke not-found.tsx. */
async function loadToko(slug: string) {
  try {
    return await getToko(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: PageProps<"/toko/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const toko = await loadToko(slug);
  return { title: `Edit ${toko.nama}` };
}

/** Rute dinamis [slug]: /toko/toko-keramik-sari-asih membuka formulir edit toko tersebut. */
export default async function EditTokoPage({ params }: PageProps<"/toko/[slug]">) {
  await requirePermission("toko:update");
  const { slug } = await params;
  const toko = await loadToko(slug);

  return <TokoForm mode="edit" slug={toko.slug} initialValues={toFormValues(toko)} coverPhoto={toko.foto} lastSaved={toko.diperbarui} />;
}
