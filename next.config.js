/** @type {import('next').NextConfig} */
const REPO_NAME = 'koai-website';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  experimental: {
    typedRoutes: true
  },
  ...(isProd
    ? {
        basePath: `/${REPO_NAME}`,
        assetPrefix: `/${REPO_NAME}/`
      }
    : {})
};

module.exports = nextConfig;
