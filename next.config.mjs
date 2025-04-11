const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/ap-ace-web' : '',
  assetPrefix: isProd ? '/ap-ace-web/' : '',
  images: {
    unoptimized: true, // <-- Important for static exports on GitHub Pages
  },
};

export default nextConfig;
