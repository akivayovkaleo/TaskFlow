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
      // Ensure victory/recharts import the vendored d3 implementations
      'victory-vendor/d3-shape': require.resolve('./node_modules/victory-vendor/lib-vendor/d3-shape/src/index.js'),
      'victory-vendor/d3-scale': require.resolve('./node_modules/victory-vendor/lib-vendor/d3-scale/src/index.js'),
      // fallback aliases for direct d3 imports
      'd3-shape': require.resolve('./node_modules/victory-vendor/lib-vendor/d3-shape/src/index.js'),
      'd3-scale': require.resolve('./node_modules/victory-vendor/lib-vendor/d3-scale/src/index.js'),
    };

    return config;
  },
};

module.exports = nextConfig;
