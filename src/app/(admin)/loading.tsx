import { PageSkeleton } from "@/components/feedback/PageSkeleton";

/** Loading UI bawaan grup admin — tampil saat Server Component menunggu data dari Express. */
export default function AdminLoading() {
  return <PageSkeleton />;
}
