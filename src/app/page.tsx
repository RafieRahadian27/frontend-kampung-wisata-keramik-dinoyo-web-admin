import { redirect } from "next/navigation";

/** Beranda panel admin selalu diarahkan ke dashboard (proxy akan meminta login bila perlu). */
export default function Home() {
  redirect("/dashboard");
}
