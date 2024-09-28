/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: `/${process.env.CONTENTFUL_SPACE_ID}/**`,
      },
      ...[1, 2, 3, 4, 5].map(i => ({
        protocol: 'https',
        hostname: `images${i}.bamboohr.com`,
        port: '',
      })),
      {
        protocol: 'https',
        hostname: 'resources.bamboohr.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.netlify.app',
        port: '',
      },
    ],
  },
}

export default nextConfig
