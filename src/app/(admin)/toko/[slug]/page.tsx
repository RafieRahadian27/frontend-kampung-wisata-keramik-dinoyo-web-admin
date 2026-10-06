import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TokoForm } from "@/components/features/toko-form/TokoForm";
import { toFormValues } from "@/components/features/toko-form/formConfig";
import { ApiError } from "@/lib/api/config";
import { getToko } from "@/lib/api/server";

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
  const { slug } = await params;
  const toko = await loadToko(slug);

  return <TokoForm mode="edit" slug={toko.slug} initialValues={toFormValues(toko)} coverPhoto={toko.foto} lastSaved={toko.diperbarui} />;
}
