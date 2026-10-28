import type { Metadata } from "next";
import { requirePermission } from "@/lib/dal";
import { TokoForm } from "../components/form/TokoForm";
import { EMPTY_TOKO_FORM } from "../components/form/formConfig";

export const metadata: Metadata = { title: "Tambah Toko Baru" };

export default async function TambahTokoPage() {
  await requirePermission("toko:create");
  return <TokoForm mode="create" initialValues={EMPTY_TOKO_FORM} />;
}
