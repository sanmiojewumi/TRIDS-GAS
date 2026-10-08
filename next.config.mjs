/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV === 'development';

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https://images.unsplash.com",
  "media-src 'self' blob:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDevelopment ? [] : ['upgrade-insecure-requests']),
].join('; ');

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/gas-engineer-crewe/', destination: '/gas-engineer-crewe', permanent: true },
      { source: '/boiler-repair-crewe/', destination: '/boiler-repair-crewe', permanent: true },
      { source: '/boiler-service-crewe/', destination: '/boiler-service-crewe', permanent: true },
      { source: '/boiler-breakdown-crewe/', destination: '/boiler-breakdown-crewe', permanent: true },
      { source: '/landlord-gas-safety-crewe/', destination: '/landlord-gas-safety-crewe', permanent: true },
      { source: '/central-heating-repair-crewe/', destination: '/central-heating-repair-crewe', permanent: true },
      { source: '/gas-cooker-installation-crewe/', destination: '/gas-cooker-installation-crewe', permanent: true },
      { source: '/areas/crewe', destination: '/gas-engineer-crewe', permanent: true },
      { source: '/areas/crewe/', destination: '/gas-engineer-crewe', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          ...(isDevelopment
            ? []
            : [
                {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=63072000; includeSubDomains; preload',
                },
              ]),
        ],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
