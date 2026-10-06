import type { Metadata } from "next";
import { TokoForm } from "@/components/features/toko-form/TokoForm";
import { EMPTY_TOKO_FORM } from "@/components/features/toko-form/formConfig";

export const metadata: Metadata = { title: "Tambah Toko Baru" };

export default function TambahTokoPage() {
  return <TokoForm mode="create" initialValues={EMPTY_TOKO_FORM} />;
}
