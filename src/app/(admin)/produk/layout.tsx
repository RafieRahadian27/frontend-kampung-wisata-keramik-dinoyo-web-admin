/** Tata letak halaman: menyusun komponen dari page.tsx dalam satu kolom berjarak seragam. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-8">{children}</div>;
}
