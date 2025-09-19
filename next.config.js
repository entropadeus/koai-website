const path = require('path');

/** @type {import('next').NextConfig} */
const REPO_NAME = 'koai-website';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  outputFileTracingRoot: path.join(__dirname),
  ...(isProd
    ? {
        basePath: `/${REPO_NAME}`,
        assetPrefix: `/${REPO_NAME}/`
      }
    : {})
};

module.exports = nextConfig;
