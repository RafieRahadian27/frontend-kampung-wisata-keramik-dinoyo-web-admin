import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sembunyikan indikator dev Next.js agar tidak menutupi tombol Logout di sidebar.
  devIndicators: false,
  experimental: {
    // Mengaktifkan forbidden() → app/(admin)/forbidden.tsx dengan status 403.
    authInterrupts: true,
  },
};

export default nextConfig;
