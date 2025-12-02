/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.preferRelative = true;
    config.resolve.symlinks = true;
    
    // Fix FullCalendar/Preact issue
    config.resolve.alias = {
      ...config.resolve.alias,
      preact: 'react',
      'preact/compat': 'react',
      'preact/hooks': 'react/hooks',
      fs: false,
      path: false,
      crypto: false,
    };

    return config;
  },
};

module.exports = nextConfig;
