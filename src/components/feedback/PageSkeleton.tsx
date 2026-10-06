import { Skeleton } from "@/components/ui/Skeleton";

/** Kerangka abu-abu berbentuk halaman admin (judul, 4 kartu, panel tabel). */
export function PageSkeleton({ variant = "table" }: { variant?: "table" | "form" }) {
  return (
    <div className="flex flex-col gap-6" role="status" aria-label="Memuat data">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-32 rounded-2xl" />
        ))}
      </div>
      {variant === "table" ? (
        <div className="flex flex-col gap-3 rounded-2xl bg-surface-lowest p-4 shadow-card sm:p-6">
          <Skeleton className="h-11 w-full" />
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)]">
          <Skeleton className="h-96 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      )}
      <span className="sr-only">Memuat…</span>
    </div>
  );
}
