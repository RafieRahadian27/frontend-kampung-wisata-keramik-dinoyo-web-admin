import { redirect } from "next/navigation";
import { homePathFor } from "@/constants/navigation";
import { verifySession } from "@/lib/dal";

/** Beranda diarahkan ke halaman awal sesuai peran (admin → dashboard, pengrajin → toko miliknya). */
export default async function Home() {
  const user = await verifySession();
  redirect(homePathFor(user.izin));
}
