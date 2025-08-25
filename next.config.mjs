/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["lucide-react"] },
  images: { domains: ["images.unsplash.com"] }
};
export default nextConfig;