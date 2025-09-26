/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Build ke time ESLint errors ignore kar dega
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizeCss: false, // fonts aur CSS optimization ke liye
  },
};

export default nextConfig;
