import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // <--- KRİTİK: Bu satır olmazsa Firebase çalıştıramaz
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;