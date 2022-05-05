/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // The following allows our site map to be generated at build time
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./lib/sitemap-generator");
    }
    return config;
  },
}

module.exports = nextConfig
