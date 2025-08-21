/** @type {import('next').NextConfig} */
const repoName = 'subhadippatra';
const nextConfig = {
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
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
  }
};

export default nextConfig;
