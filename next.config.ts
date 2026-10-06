import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sembunyikan indikator dev Next.js agar tidak menutupi tombol Logout di sidebar.
  devIndicators: false,
};

export default nextConfig;
