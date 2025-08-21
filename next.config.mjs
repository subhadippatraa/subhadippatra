/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  },
  experimental: {
    typedRoutes: false
  },
  async rewrites() {
    return [
      { source: '/Home', destination: '/home' },
      { source: '/Skills', destination: '/skills' },
      { source: '/Projects', destination: '/projects' },
      { source: '/Education', destination: '/education' },
      { source: '/Experience', destination: '/experience' },
      { source: '/Blog', destination: '/blog' },
      { source: '/Contact', destination: '/contact' }
    ];
  }
};

export default nextConfig;
